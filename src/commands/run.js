#!/usr/bin/env node
'use strict'

const cmd = {
  command: 'run <dataset..>',
  desc: 'run the following dataset of tests',
  builder: yargs => {
    yargs.commandDir('datasets')
  },
  handler: () => {}
}

module.exports = cmd
