#!/usr/bin/env node
import { readFile } from 'fs/promises'
import path from 'path'
import { generateGigs } from '../src/main.js'
import json2md from 'json2md'

const __dirname = process.cwd()
const jsonConfigFileContents = await readFile(
  path.join(__dirname, 'gigsboat.json'),
  'utf8'
)
const gigsConfig = JSON.parse(jsonConfigFileContents)

const gigsMarkdown = await generateGigs()

let markdownOutput = ''
for (const [hook, contents] of Object.entries(gigsConfig)) {
  if (hook === 'preContent') {
    for (const content of contents) {
      if (content.hasOwnProperty('raw')) {
        markdownOutput += content.raw + '\n'
      }

      if (content.hasOwnProperty('format')) {
        markdownOutput += json2md(content.format) + '\n'
      }
    }
  }

  markdownOutput += gigsMarkdown + '\n'
}

console.log(markdownOutput)
