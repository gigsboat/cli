import { promises as fs } from 'fs'

import path from 'path'

const __dirname = process.cwd()

export async function processOutput({ document, outputFile }) {
  if (outputFile) {
    await fs.writeFile(path.join(__dirname, outputFile), document)
  } else {
    console.log(document)
  }
}
