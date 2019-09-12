const fs = require('fs')
const through = require('through2')
const split = require('binary-split')
const pump = require('pump')

const parser = through.obj((data, enc, done) => {
  try {
    const comment = JSON.parse(data.toString('utf8'))
    done(null, comment)
  } catch (e) {
    return done(e)
  }
})

function loader(path) {
  const file = fs.createReadStream(path)
  return pump(file, split(), parser)
}

function formatter(stream, { removeDeleted = true } = {}) {
  return new Promise((resolve, reject) => {
    let userNum = 0
    let eventNum = 0
    const topics = {}
    const users = {}
    stream
      .on('data', comment => {
        if (comment.author === '[deleted]') {
          // Remove deleted user accounts
          if (removeDeleted) return
          // Workaround for deleted users
          comment.author = `node-${userNum}`
        }
        // Create the topic if it does not exist
        if (!topics[comment.subreddit]) {
          topics[comment.subreddit] = {
            name: comment.subreddit,
            author: comment.author,
            totalNumberEvents: 1
          }
        } else {
          topics[comment.subreddit].totalNumberEvents++
        }
        // Create the user if it does not exist
        if (!users[comment.author]) {
          userNum++
          users[comment.author] = {
            name: comment.author,
            node: `node-${userNum}`,
            events: [],
            subscriptions: {}
          }
        }
        // Set user subscriptions
        users[comment.author].subscriptions[comment.subreddit] = true

        // Set use publish messages
        const { body, ups, downs, controversiality } = comment
        users[comment.author].events.push({
          internalId: eventNum++,
          body,
          ups,
          downs,
          controversiality
        })
      })
      .on('end', () => {
        resolve({ users, topics })
      })
      .on('error', err => reject(err))
  })
}

function outputToStdout({ users, topics }) {
  Object.values(users).forEach(user => console.log(JSON.stringify(user)))
  Object.values(topics).forEach(topic => console.log(JSON.stringify(topic)))
}

module.exports = {
  loader,
  formatter,
  outputToStdout
}
