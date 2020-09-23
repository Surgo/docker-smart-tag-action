# Create a JavaScript Action using TypeScript

![build-test](https://github.com/Surgo/docker-smart-tag-action/workflows/build-test/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

##  About

Generate Docker tag from for each branches or tags

> :bulb: See also:
> * [docker/build-push-action](https://github.com/docker/build-push-action/)

### Example (smart) tag

* Pull request: `pr-<pull request number>`
* Publish with tags: `v1.0.0` => `1.0.0`, `1.0`, `1` and `latest`
* Branch: `topic/my_branch` => `topic-my_branch`
    * Default branch => `edge`
    * Scheduled build => `nightly`

## Usage

```yaml
jobs:
  main:
    runs-on: ubuntu-latest
  steps:
    - name: Get smart tag
      id: prepare
      uses: docker-smart-tag-action@v1
      with:
        docker_image: name/app
    - name: Build and push
      uses: docker/build-push-action@v2
      with:
        push: true
        tags: ${{ steps.prepare.outputs.tag }}
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name              | Type      | Description                       |
|-------------------|-----------|-----------------------------------|
| `docker_image`    | String    | Docker image name e.g. `name/app` |
| `default_branch`  | String    | Default branch (default `main`). If not main, specify `${{ github.event.repository.default_branch }}` or your default branch. |
| `tag_with_sha`    | String    | Tags the built image with the git short SHA prefixed with `sha-`. |

[See example config](.github/workflows/test.yml)

### outputs

Following outputs are available

* `tag`: Smart tag

## Development

### Build
```
npm run build
```

### Test

```
npm run build
npm t
```
