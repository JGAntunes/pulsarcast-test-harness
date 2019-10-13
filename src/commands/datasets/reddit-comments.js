#!/usr/bin/env node
'use strict'

const redditComments = require('../../lib/reddit-comments')

const cmd = {
  command: 'reddit-comments <path>',
  desc: 'run the reddit comments dataset',
  builder: yargs => {
    yargs
      .positional('path', {
        describe: 'path to the dataset file',
        type: 'string'
      })
      .option('resize', {
        describe: 'resize the number of users to a specific value',
        type: 'number'
      })
      .option('remove-deleted', {
        describe: 'remove the deleted users (without id)',
        type: 'boolean',
        default: true
      })
  },
  handler: async ({ path, resize, removeDeleted }) => {
    const { users, topics } = await redditComments(path, {
      resizeDataset: Number.isInteger(resize),
      maxUsers: resize,
      removeDeleted
    })
    Object.values(topics).forEach(topic =>
      console.log(JSON.stringify({ type: 'topic', ...topic }))
    )
    Object.values(users).forEach(user =>
      console.log(JSON.stringify({ type: 'user', ...user }))
    )
  }
}

module.exports = cmd
