#!/usr/bin/env node

'use strict'

const commist = require('commist')()
const mfeGenerator = require('./generators/flowrty-mfe/index.js')
const fs = require('fs')
const path = require('path')
const figlet = require('figlet')
const logger = require('./lib/log.js')

function showHelp () {
  try {
    logger('info', figlet.textSync('flowrty-cli', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true
    }))

    const file = fs.readFileSync(path.join(__dirname, 'help', 'usage.txt'), 'utf8')
    logger('info', file)
  } catch (e) {

  }
}

const res = commist
  .register('generate:mfe', mfeGenerator.cli)
  .parse(process.argv.splice(2))

  console.log()

if (res) {
  // No Command was regnized
  showHelp()
}
