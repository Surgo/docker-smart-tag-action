export function getSmartTag(github_ref: string) {
  let smart_tag = github_ref.replace(/refs\/(heads|tags)\//, '')
  if (smart_tag === 'master') {
    return 'latest'
  }
  return smart_tag.replace('/', '-')
}
