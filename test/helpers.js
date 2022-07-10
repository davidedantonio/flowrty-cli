'use strict'

const path = require('path')
const fs = require('fs/promises')

async function checkFileExists (filename) {
  try {
    await fs.stat(path.join(filename))
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  checkFileExists
}
