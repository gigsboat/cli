#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { generateGigs } from '../src/main.js'
import { formatToMarkdown } from '../src/utils/md-formatter.js'

const gigsConfig = await getConfig()
const gigsMarkdown = await generateGigs()

let markdownOutputPreContent = ''
let markdownOutputPostContent = ''
let markdownOutput = ''

if (gigsConfig.hasOwnProperty('preContent')) {
  markdownOutputPreContent = processCustomContent(gigsConfig.preContent)
}
if (gigsConfig.hasOwnProperty('postContent')) {
  markdownOutputPostContent = processCustomContent(gigsConfig.postContent)
}

markdownOutput +=
  markdownOutputPreContent + gigsMarkdown + markdownOutputPostContent

processOutput()

async function processOutput() {
  const __dirname = process.cwd()
  if (gigsConfig.hasOwnProperty('outputFile')) {
    await writeFile(path.join(__dirname, gigsConfig.outputFile), markdownOutput)
  } else {
    console.log(markdownOutput)
  }
}

function processCustomContent(contents) {
  let markdownContent = ''
  for (const content of contents) {
    if (content.hasOwnProperty('raw')) {
      markdownContent += content.raw + '\n'
    }

    if (content.hasOwnProperty('format')) {
      markdownContent += formatToMarkdown(content.format) + '\n'
    }
  }

  return markdownContent
}

async function getConfig() {
  const configFileName = 'gigsboat.json'
  const __dirname = process.cwd()
  const jsonConfigFileContents = await readFile(
    path.join(__dirname, configFileName),
    'utf8'
  )
  const gigsConfig = JSON.parse(jsonConfigFileContents)

  return gigsConfig
}
