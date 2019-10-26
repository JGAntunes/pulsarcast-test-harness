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

function formatter(
  stream,
  { resizeDataset = false, maxUsers = 100, removeDeleted = true } = {}
) {
  return new Promise((resolve, reject) => {
    let userNum = 0
    let eventNum = 0
    const topics = {}
    const users = {}
    // Helper index to keep users that exceed number of Nodes
    const extraUsers = {}
    stream
      .on('data', comment => {
        let userId = comment.author
        if (userId === '[deleted]') {
          // Remove deleted user accounts
          if (removeDeleted) return
          // Workaround for deleted users
          userId = `node-${userNum}`
        }

        // Create the user if it does not exist
        if (!users[userId]) {
          // The number of users exceeds the requested
          // we'll map to already existing users
          if (resizeDataset && userNum >= maxUsers) {
            const userIds = Object.keys(users)
            const randomAuthor = Math.floor(
              Math.random() * Math.floor(userIds.length)
            )
            extraUsers[userId] = userIds[randomAuthor]
            userId = userIds[randomAuthor]
          } else {
            userNum++
            users[userId] = {
              name: userId,
              node: `node-${userNum}`,
              events: [],
              subscriptions: {}
            }
          }
        }

        // Create the topic if it does not exist
        if (!topics[comment.subreddit]) {
          topics[comment.subreddit] = {
            node: `node-${userNum}`,
            name: comment.subreddit,
            author: userId,
            totalNumberEvents: 1
          }
        } else {
          topics[comment.subreddit].totalNumberEvents++
        }

        // Check if user exceeded the allowed number and is mapped to someone else
        if (extraUsers[userId]) {
          userId = extraUsers[userId]
        }
        // Set user subscriptions
        users[userId].subscriptions[comment.subreddit] = true

        // Set use publish messages
        const { body, ups, downs, controversiality, subreddit } = comment
        users[userId].events.push({
          internalId: eventNum++,
          topic: subreddit,
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

module.exports = {
  loader,
  formatter
}
