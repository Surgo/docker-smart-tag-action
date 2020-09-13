export function getSmartTag(github_ref: string): string {
  const smartTag = github_ref.replace(/refs\/(heads|tags)\//, '')
  if (smartTag === 'master') {
    return 'latest'
  }
  return smartTag.replace('/', '-')
}
