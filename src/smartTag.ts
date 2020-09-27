import * as semver from 'semver'

function getSmartTagFromTag(dockerImage: string, githubRef: string): string {
  const version = githubRef.replace('refs/tags/', '').replace(/\//g, '-')
  const semanticVersion = semver.clean(version)
  if (!semanticVersion) {
    return `${dockerImage}:latest,${dockerImage}:${version}`
  }
  const tags = `${dockerImage}:${semanticVersion}`
  const majorVerion = semver.major(semanticVersion)
  const minorVerion = semver.minor(semanticVersion)
  return `${dockerImage}:latest,${dockerImage}:${majorVerion},${dockerImage}:${majorVerion}.${minorVerion},${tags}`
}

function getSmartTagFromPullRequest(
  dockerImage: string,
  githubRef: string
): string {
  const version = githubRef.replace('refs/pull/', '').replace('/merge', '')
  return `${dockerImage}:pr-${version}`
}

function getSmartTagFromBranch(
  dockerImage: string,
  githubRef: string,
  defaultBranch: string
): string {
  const version = githubRef.replace('refs/heads/', '').replace(/\//g, '-')
  if (version === defaultBranch) {
    return `${dockerImage}:edge`
  }
  return `${dockerImage}:${version}`
}

function getTag(
  dockerImage: string,
  githubRef: string,
  githubSha: string,
  githubEventName: string,
  defaultBranch: string
): string {
  if (githubEventName === 'schedule') {
    return `${dockerImage}:nightly`
  } else if (githubRef.match(/refs\/tags\//)) {
    return getSmartTagFromTag(dockerImage, githubRef)
  } else if (githubRef.match(/refs\/pull\//)) {
    return getSmartTagFromPullRequest(dockerImage, githubRef)
  } else if (githubRef.match(/refs\/heads\//)) {
    return getSmartTagFromBranch(dockerImage, githubRef, defaultBranch)
  }
  return `${dockerImage}:noop`
}

export function getSmartTag(
  dockerImage: string,
  githubRef: string,
  githubSha: string,
  githubEventName: string,
  defaultBranch: string,
  tagWithSha: boolean
): string {
  const tag = getTag(
    dockerImage,
    githubRef,
    githubSha,
    githubEventName,
    defaultBranch
  )
  if (tagWithSha) {
    return `${tag},${dockerImage}:sha-${githubSha.substr(0, 8)}`
  }
  return tag
}
