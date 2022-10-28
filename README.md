# Unofficial GitHub Insights API on AWS Lambda

This is a simple AWS Lambda function that provides a REST API for GitHub Insights data which is not available via the GitHub API.

## Supported endpoints

### /:owner/:repo/network/dependents

Returns the numbers of repositories and packages that depend on each package in the given repository.

#### Example

```json
{
  "packages": [
    {
      "name": "github.com.cnpmjs.org/ipfs/go-ipfs.git",
      "id": "UGFja2FnZS0yMjkyMTQ0OTA1",
      "repositories": "0",
      "packages": "0"
    }
  ]
}
```

## Usage

### Deploying to AWS Lambda

1. Create a new AWS Lambda function
  - Runtime: `Node.js 16.x`
  - Architecture: `x86_64`
  - Memory: `1024 MB`
  - Timeout: `3 sec`
  - Enable function URL: `true`
1. Deploy the function
  - Run: `npm run deploy`
