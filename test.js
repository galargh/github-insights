const index = require('./index.js')

const test = async () => {
  const result = await index.handler({
      rawPath: '/filecoin-project/bacalhau/network/dependents',
  })
  console.log(result)
}

test()
