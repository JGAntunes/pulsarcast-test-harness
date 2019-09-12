const { loader, formatter, outputToStdout } = require('./loader')

let path
try {
  path = process.argv[2]
} catch (e) {
  throw new Error(
    'Provide a path for the dataset to load as the first argument'
  )
}

formatter(loader(path))
  .then(outputToStdout)
  .catch(err => {
    throw err
  })
