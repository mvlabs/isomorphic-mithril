import fs from 'fs'
import glob from 'tiny-glob'

const getHash = paths => {
  const mostRecent = paths.reduce((acc, path) => {
    const timestamp = new Date(fs.statSync(path).ctime).getTime()
    return Math.max(acc.timestamp, timestamp) === timestamp
      ? { path, timestamp }
      : acc
  }, { path: '', timestamp: new Date('1970-01-01').getTime() })
  const segments = mostRecent.path.split('.')
  return segments[segments.length - 2]
}

const getBuildHashes = () => Promise.all([
  glob('dist/app.*.css'),
  glob('dist/app.*.js')
])
  .then(([cssFiles, jsFiles]) => ({
    css: getHash(cssFiles),
    js: getHash(jsFiles)
  }))

export {
  getBuildHashes
}
