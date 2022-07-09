
'use strict'

const chalk = require('chalk')

const levels = {
  debug: 0,
  info: 1,
  error: 2,
  success: 3
}

const colors = [l => l, chalk.cyan, chalk.red, chalk.green]

function log (level, message) {
  const severity = levels[level] || 0
  console.log(colors[severity](message))
}

module.exports = log
