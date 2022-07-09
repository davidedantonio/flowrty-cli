'use strict'

const inquirer = require('inquirer')
const log = require('../../lib/log')
const generateProject = require('./generate')

async function cli () {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      default: 'flowrty-project',
      validate: function (value) {
        if (value.match(/^[a-z-]+$/)) {
          return true
        }

        return 'Project name must be only letters, dashes, and no spaces'
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is the description of your project?',
      default: 'My Flowrty project description'
    },
    {
      type: 'input',
      name: 'author',
      message: 'What is the author of your project?',
      default: 'John Doe'
    },
    {
      type: 'input',
      name: 'mfeContainerName',
      message: 'What is the MFE container name?',
      default: 'flowrty-core.mfe-app'
    },
    {
      type: 'input',
      name: 'mfeName',
      message: 'What is the MFE name?',
      default: 'flowrty-core.mfe-app'
    },
    {
      type: 'input',
      name: 'port',
      message: 'What is the port to expose?',
      default: '3000'
    },
    {
      type: 'input',
      name: 'appTitle',
      message: 'What is the application title?',
      default: 'My Flowrty App'
    }
  ]

  try {
    const answers = await inquirer.prompt(questions)
    await generateProject(answers)
    
  } catch (err) {
    log('error', err)
    process.exit(1)
  }
}

module.exports = { cli, generateProject }
