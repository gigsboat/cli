#!/usr/bin/env node
import { getConfig } from './config-manager.js'
import { processOutput } from './output-handler.js'
import { generateDocument, generateEleventyDocument } from '../src/main.js'

let gigsConfig = await getConfig()

const shouldGenerateEleventy = process.argv.includes('--eleventy')

const document = await generateDocument({
  sourceDirectory: gigsConfig.input.sourceDirectory,
  preContent: gigsConfig.preContent,
  postContent: gigsConfig.postContent
})

const eleventyDocument = shouldGenerateEleventy
  ? generateEleventyDocument({
      document,
      config: {
        title: gigsConfig.eleventy.title,
        description: gigsConfig.eleventy.description,
        layout: gigsConfig.eleventy.layout
      }
    })
  : null

await processOutput({
  document,
  outputFile: gigsConfig.output.markdownFile,
  eleventyDocument,
  eleventyOutputFile: `${gigsConfig.eleventy.inputDir}/index.md`
})
