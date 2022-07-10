'use strict'

const { test, before } = require('tap')
const { generateProject } = require('../generators/flowrty-mfe')
const fs = require('fs/promises')
const path = require('path')
const yaml = require('js-yaml')
const { checkFileExists } = require('./helpers')

const args = {
  name: 'flowrty-project',
  description: 'My Flowrty project description',
  author: 'John Doe <john.doe@flowrty.com>',
  mfeContainerName: 'flowrty-core.mfe-app',
  mfeName: 'mfeApp',
  port: '3000',
  appTitle: 'My Flowrty App'
}

before(async () => {
  const projDir = path.join(process.cwd(), args.name)
  const check = await checkFileExists(projDir)
  if (check) {
    await fs.rm(projDir, { recursive: true })
  }
})

test('Mfe generator', async t => {
  await generateProject(args)
  const projDir = path.join(process.cwd(), args.name)
  const check = await checkFileExists(projDir)

  t.same(check, true)
})

test('Mfe check docker-compose.yml file', async t => {
  const dockerComposeFile = path.join(process.cwd(), args.name, 'docker-compose.yml')
  const dockerComposeFileContent = await fs.readFile(dockerComposeFile, 'utf8')
  const dockerCompose = yaml.load(dockerComposeFileContent)

  t.same(Object.keys(dockerCompose.services)[0], args.mfeContainerName)
  t.same(dockerCompose.services[args.mfeContainerName].container_name, args.mfeContainerName)
  t.same(dockerCompose.services[args.mfeContainerName].ports, [`${args.port}:${args.port}`])
})

test('Mfe check package.json', async t => {
  const packageJsonFile = path.join(process.cwd(), args.name, 'package.json')
  let packageJsonContent = await fs.readFile(packageJsonFile, 'utf8')
  packageJsonContent = JSON.parse(packageJsonContent)

  t.same(packageJsonContent.name, args.name)
  t.same(packageJsonContent.description, args.description)
  t.same(packageJsonContent.author, args.author)
})

test('Mfe generator error', async t => {
  try {
    await generateProject(args)
  } catch (err) {
    t.same(err.message, 'Already exist a file with name flowrty-project')
  }
})
