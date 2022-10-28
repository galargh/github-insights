const index = require('./index.js')

const test = async () => {
  const result = await index.handler({
      rawPath: '/testground/testground/network/dependents',
  })
  console.log(result)
}

test()
