import {getSmartTag} from './smartTag'
import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const dockerImage: string = core.getInput('docker_image')
    const defaultBranch: string = core.getInput('default_branch') || 'main'
    const tagWithSha: boolean = core.getInput('tag_with_sha') === 'true'

    const githubRef: string = process.env['GITHUB_REF'] || 'noop'
    const githubSha: string = process.env['GITHUB_SHA'] || 'undefined'
    const githubEventName: string =
      process.env['GITHUB_EVENT_NAME'] || 'undefined'

    core.setOutput(
      'tag',
      getSmartTag(
        dockerImage,
        githubRef,
        githubSha,
        githubEventName,
        defaultBranch,
        tagWithSha
      )
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
