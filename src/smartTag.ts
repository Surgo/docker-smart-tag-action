import * as semver from 'semver'

function getSmartTagFromTag(dockerImage: string, githubRef: string): string {
  const version = githubRef.replace('refs/tags/', '').replace('/', '-')
  const semanticVersion = semver.clean(version)
  if (!semanticVersion) {
    return `${dockerImage}:${version}`
  }
  const tags = `${dockerImage}:${semanticVersion}`
  const majorVerion = semver.major(semanticVersion)
  const minorVerion = semver.minor(semanticVersion)
  return `${dockerImage}:${majorVerion},${dockerImage}:${majorVerion}.${minorVerion},${tags}`
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
  let version = githubRef.replace('refs/heads/', '').replace('/', '-')
  if (version === defaultBranch) {
    version = 'edge'
  }
  return `${dockerImage}:${version}`
}

export function getSmartTag(
  dockerImage: string,
  githubRef: string,
  githubSha: string,
  githubEventName: string,
  defaultBranch: string,
  tagWithSha: boolean
): string {
  let tags = ''
  if (githubEventName === 'schedule') {
    tags = `${dockerImage}:nightly`
  } else if (githubRef.match(/refs\/tags\//)) {
    tags = getSmartTagFromTag(dockerImage, githubRef)
  } else if (githubRef.match(/refs\/pull\//)) {
    tags = getSmartTagFromPullRequest(dockerImage, githubRef)
  } else if (githubRef.match(/refs\/heads\//)) {
    tags = getSmartTagFromBranch(dockerImage, githubRef, defaultBranch)
  } else {
    tags = `${dockerImage}:noop`
  }
  if (tagWithSha) {
    tags = `${tags},${dockerImage}:sha-${githubSha.substr(0, 8)}`
  }
  return tags
}
