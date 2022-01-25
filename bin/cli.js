#!/usr/bin/env node
import { getConfig } from './config-manager.js'
import { processOutput } from './output-handler.js'
import { generateDocument } from '../src/main.js'

let gigsConfig = await getConfig()

const document = await generateDocument({
  sourceDirectory: gigsConfig.input.sourceDirectory,
  preContent: gigsConfig.preContent,
  postContent: gigsConfig.postContent,
  metadata: gigsConfig.metadata
})

await processOutput({ document, outputFile: gigsConfig.output.markdownFile })
