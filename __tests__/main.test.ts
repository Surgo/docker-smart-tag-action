import {getSmartTag} from '../src/smartTag'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

const githubSha = 'ffac537e6cbbf934b08745a378932722df287a53'

describe.each([
  ['refs/heads/main', 'schedule', 'main', false, 'name/app:nightly'],
  [
    // Pull request
    'refs/heads/topic/my_branch',
    'pull_request',
    'main',
    false,
    'name/app:topic-my_branch'
  ],
  [
    // Push branch
    'refs/heads/topic/my_branch',
    'push',
    'main',
    false,
    'name/app:topic-my_branch'
  ],
  [
    // With sha
    'refs/heads/topic/my_branch',
    'push',
    'main',
    true,
    'name/app:topic-my_branch,name/app:sha-ffac537e'
  ],
  [
    // Default branch
    'refs/heads/default',
    'push',
    'default',
    false,
    'name/app:edge'
  ],
  [
    'refs/tags/v1.0.0',
    'release',
    'main',
    false,
    'name/app:1,name/app:1.0,name/app:1.0.0'
  ],
  ['refs/tags/v1', 'release', 'main', false, 'name/app:v1']
])(
  'Convert: %s, %s, %s, %s => %s',
  (
    githubRef: string,
    githubEventName: string,
    defaultBranch: string,
    tagWithSha: boolean,
    expected: string
  ) => {
    test(`getSmartTag ${githubRef} on ${githubEventName}`, () => {
      expect(
        getSmartTag(
          'name/app',
          githubRef,
          githubSha,
          githubEventName,
          defaultBranch,
          tagWithSha
        )
      ).toEqual(expected)
    })
  }
)

test('test runs', () => {
  process.env['INPUT_DOCKER_IMAGE'] = 'name/app'
  process.env['INPUT_DEFAULT_BRANCH'] = 'main'
  process.env['INPUT_TAG_WITH_SHA'] = 'false'
  process.env['GITHUB_REF'] = 'refs/heads/topic/my_branch'
  process.env['GITHUB_SHA'] = githubSha
  process.env['GITHUB_EVENT_NAME'] = 'push'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
