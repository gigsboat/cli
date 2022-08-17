#!/usr/bin/env node
import { parseCliArgs } from './cli-parser.js'
import { getConfig } from './config-manager.js'
import { processOutput } from './output-handler.js'
import { generateDocument } from '../src/main.js'
import DebugLogger from 'debug'

const debug = DebugLogger('gigsboat:app')
// DebugLogger.enable('gigsboat:app')

async function init() {
  const cliArgs = parseCliArgs()

  // command line arguments always override config file
  // in order of precedence, and so:
  let gigsConfig = await getConfig()
  if (cliArgs.sourceDirectory) {
    gigsConfig.input.sourceDirectory = cliArgs.sourceDirectory
  }
  if (cliArgs.outputFile) {
    gigsConfig.output.markdownFile = cliArgs.outputFile
  }

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
}

init()
