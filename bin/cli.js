#!/usr/bin/env node
import { readFile } from 'fs/promises'
import path from 'path'
import { generateGigs } from '../src/main.js'
import { formatToMarkdown } from '../src/utils/md-formatter.js'

const __dirname = process.cwd()
const jsonConfigFileContents = await readFile(
  path.join(__dirname, 'gigsboat.json'),
  'utf8'
)
const gigsConfig = JSON.parse(jsonConfigFileContents)

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

console.log(markdownOutput)

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
