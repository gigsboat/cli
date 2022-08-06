import DebugLogger from 'debug'
import { promises as fs } from 'fs'
import path from 'path'

const debug = DebugLogger('gigsboat:app')

export async function processOutput({ document, outputFile }) {
  if (outputFile) {

    if (path.isAbsolute(outputFile)) {
      debug('detected absolute path for output file')
    } else {
      const __dirname = process.cwd()
      outputFile = path.join(__dirname, outputFile)
    }

    await fs.writeFile(outputFile, document)
  } else {
    console.log(document)
  }
}
