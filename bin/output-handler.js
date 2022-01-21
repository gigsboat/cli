import { promises as fs } from 'fs'

import path from 'path'

const __dirname = process.cwd()

export async function processOutput({
  document,
  outputFile,
  eleventyDocument,
  eleventyOutputFile
}) {
  if (outputFile) {
    await fs.writeFile(path.join(__dirname, outputFile), document)

    if (eleventyDocument) {
      await fs.writeFile(
        path.join(__dirname, eleventyOutputFile),
        eleventyDocument
      )
    }
  } else {
    console.log(document)
  }
}
