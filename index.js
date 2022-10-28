const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
    console.info(JSON.stringify(event))
    const [_, org, repo, cat, opt, ...rest] = event.rawPath.split('/')
    if (cat !== 'network') {
        return {
            statusCode: 403,
            body: JSON.stringify({
                message: `Category '${cat}' is not supported.`
            })
        }
    }
    if (opt !== 'dependents') {
        return {
            statusCode: 403,
            body: JSON.stringify({
                message: `Option '${opt} is not supported.'`
            })
        }
    }
    if (rest.length !== 0) {
        return {
            statusCode: 403,
            body: JSON.stringify({
                message: `Path '${event.path}' has unsupported number of segments.`
            })
        }
    }
    const response = await fetch(`https://github.com/${org}/${repo}/${cat}/${opt}`)
    const body = await response.text()
    const packageIdList = [...body.matchAll(new RegExp(`"/${org}/${repo}/network/dependents\\?package_id=(.+?)"`, 'g'))]
    const packageNameList = [...body.matchAll(/<span class="select-menu-item-text">(.+?)<\/span>/sg)]
    const packageList = []
    if (packageIdList.length === 0) {
      const name = `github.com/${org}/${repo}`
      const repositories = body.match(/([\d,]+)\s+Repositories/s)[1].replace(',', '')
      const packages = body.match(/([\d,]+)\s+Packages/s)[1].replace(',', '')
      packageList.push({
        name,
        repositories,
        packages
      })
    } else {
      packageList.push(...(await Promise.all(packageIdList.map(async ([_, id], i) => {
          const name = packageNameList[i][1].trim()
          const response = await fetch(`https://github.com/${org}/${repo}/${cat}/${opt}?package_id=${id}`)
          const body = await response.text()
          const repositories = body.match(/([\d,]+)\s+Repositories/s)[1].replace(',', '')
          const packages = body.match(/([\d,]+)\s+Packages/s)[1].replace(',', '')
          return {
              name,
              id,
              repositories,
              packages
          }
      }))))
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        packages: packageList
      })
    }
};
