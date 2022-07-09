'use strict'

const Handlebars = require('handlebars')
const fs = require('fs/promises')
const path = require('path')
const copy = require('recursive-copy')

async function checkFileExists (filename) {
  try {
    await fs.stat(path.join(filename))
    return true
  } catch (e) {
    return false
  }
}

async function compileHandlebarTemplate (hbFile, args) {
  const fileTemplate = await fs.readFile(hbFile, 'utf8')
  const template = Handlebars.compile(fileTemplate)

  const content = template({
    ...args
  })

  return content
}

async function generateProject (args) {
  const projDir = path.join(process.cwd(), args.name)
  const projectExist = await checkFileExists(projDir)

  if (projectExist) {
    throw new Error(`Already exist a file with name ${args.name}`)
  }

  await copy(path.join(__dirname, 'template'), projDir)

  await fs.rename(path.join(projDir, '__env-template'), path.join(projDir, '.env-template'))
  await fs.rename(path.join(projDir, '__eslintrc.js'), path.join(projDir, '.eslintrc.js'))
  await fs.rename(path.join(projDir, '__gitignore'), path.join(projDir, '.gitignore'))

  const readMeContent = await compileHandlebarTemplate(path.join(projDir, 'README.hbs'), args)
  await fs.rename(path.join(projDir, 'README.hbs'), path.join(projDir, 'README.md'))
  await fs.writeFile(path.join(projDir, 'README.md'), readMeContent)

  const webpackConfigContent = await compileHandlebarTemplate(path.join(projDir, 'webpack.config.hbs'), args)
  await fs.rename(path.join(projDir, 'webpack.config.hbs'), path.join(projDir, 'webpack.config.js'))
  await fs.writeFile(path.join(projDir, 'webpack.config.js'), webpackConfigContent)

  const packagesContent = await compileHandlebarTemplate(path.join(projDir, 'package.hbs'), args)
  await fs.rename(path.join(projDir, 'package.hbs'), path.join(projDir, 'package.json'))
  await fs.writeFile(path.join(projDir, 'package.json'), packagesContent)

  const dockerFileContent = await compileHandlebarTemplate(path.join(projDir, 'docker-compose.hbs'), args)
  await fs.rename(path.join(projDir, 'docker-compose.hbs'), path.join(projDir, 'docker-compose.yml'))
  await fs.writeFile(path.join(projDir, 'docker-compose.yml'), dockerFileContent)
}

module.exports = generateProject
