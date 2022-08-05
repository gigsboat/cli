#!/usr/bin/env node
import { parseCliArgs } from './cli-parser.js'
import { getConfig } from './config-manager.js'
import { processOutput } from './output-handler.js'
import { generateDocument } from '../src/main.js'

const cliArgs = parseCliArgs()

// command line arguments always override config file
// in order of precedence, and so:
const configFromCliArgs = {
  input: {
    sourceDirectory: cliArgs.sourceDirectory
  },
  output: {
    markdownFile: cliArgs.outputFile
  }
}
let gigsConfig = await getConfig(configFromCliArgs)

console.log(gigsConfig)

const document = await generateDocument({
  sourceDirectory: gigsConfig.input.sourceDirectory,
  preContent: gigsConfig.preContent,
  postContent: gigsConfig.postContent
})

await processOutput({ document, outputFile: gigsConfig.output.markdownFile })
