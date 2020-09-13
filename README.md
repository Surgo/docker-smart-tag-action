# Create a JavaScript Action using TypeScript

![build-test](https://github.com/Surgo/docker-smart-tag-action/workflows/build-test/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

##  About

Generate Docker tag from for each branches or tags

> :bulb: See also:
> * [docker/build-push-action](https://github.com/docker/build-push-action/)

## Usage

```yaml
jobs:
  main:
    runs-on: ubuntu-latest
  steps:
    - name: Get smart tag
      id: prepare
      uses: docker-smart-tag-action@v1
    - name: Build and push
      uses: docker/build-push-action@v2
      with:
        push: true
        tags: ${{ steps.prepare.outputs.tag }}
```

### outputs

Following outputs are available

* `tag`: Smart tag from branches or tags
