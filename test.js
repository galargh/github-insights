const index = require('./index.js')

const test = async () => {
  const result = await index.handler({
      rawPath: '/ipfs/kubo/network/dependents',
  })
  console.log(result)
}

test()
