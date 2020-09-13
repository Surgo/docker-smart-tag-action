import {getSmartTag} from '../src/smartTag'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

describe.each([
  ['latest', 'refs/heads/master'],
  ['topic-my_branch', 'refs/heads/topic/my_branch'],
  ['1.0.0', 'refs/tags/1.0.0']
])('Converts %s to %s', (expected, actual) => {
  test(`getSmartTag ${actual}`, () => {
    expect(getSmartTag(actual)).toEqual(expected)
  })
})

test('test runs', () => {
  process.env['GITHUB_REF'] = 'refs/heads/topic/my_branch_name'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
