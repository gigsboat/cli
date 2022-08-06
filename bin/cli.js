#!/usr/bin/env node
import { parseCliArgs } from './cli-parser.js'
import { getConfig } from './config-manager.js'
import { processOutput } from './output-handler.js'
import { generateDocument } from '../src/main.js'
import DebugLogger from 'debug'

const debug = DebugLogger('gigsboat:app')
const cliArgs = parseCliArgs()

DebugLogger.enable('gigsboat:app')

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

debug('loaded configuration:')
debug(' - source directory: %s', gigsConfig.input.sourceDirectory)
debug(' - output file: %s', gigsConfig.output.markdownFile)
const document = await generateDocument({
  sourceDirectory: gigsConfig.input.sourceDirectory,
  preContent: gigsConfig.preContent,
  postContent: gigsConfig.postContent
})

await processOutput({ document, outputFile: gigsConfig.output.markdownFile })
debug('finished')