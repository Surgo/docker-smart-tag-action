import {getSmartTag} from './smartTag'
import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const github_ref: string | undefined = process.env['GITHUB_REF']
    if (typeof github_ref === 'undefined') {
      core.setFailed('Failed to retrieve environment variable "GITHUB_REF"')
      return
    }
    core.debug(`GITHUB_REF: ${github_ref}`)
    core.setOutput('tag', getSmartTag(github_ref))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
