const { loader, formatter } = require('./loader')

function redditComments(path, opts) {
  return formatter(loader(path), opts)
}

module.exports = redditComments
