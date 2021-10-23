#!/usr/bin/env node
import { getConfig } from './config-manager.js'
import { processOutput } from './output-handler.js'
import { generateDocument } from '../src/main.js'

const gigsConfig = await getConfig()
const document = await generateDocument({
  preContent: gigsConfig?.preContent,
  postContent: gigsConfig?.postContent
})

processOutput({ document, outputFile: gigsConfig?.outputFile })
