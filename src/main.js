import path from 'path'
import { URL } from 'url'

import { getAllFiles } from './utils/fs.js'
import { convertToJson } from './utils/yaml-parser.js'

// const __dirname = new URL('.', import.meta.url).pathname
const __dirname = process.cwd()
console.log(__dirname)

async function getEntriesByBuckets(entries) {
  const bucketsAll = []
  const bucketsYear = {}
  const bucketsType = {}
  const bucketsLanguage = {}
  const bucketsCountry = {}

  for (const entry of entries) {
    const { attributes } = entry
    const { date, type, language, country } = attributes

    const year = new Date(date).getFullYear()
    if (bucketsYear[year] === undefined) {
      bucketsYear[year] = [entry]
    } else {
      bucketsYear[year].push(entry)
    }
  }

  return {
    bucketsYear
  }
}

export async function main() {
  const directoryPath = path.join(__dirname, 'pages')
  const allFiles = await getAllFiles(directoryPath)

  const entries = []
  for (const filePath of allFiles) {
    const json = await convertToJson(filePath)
    entries.push(json)
  }

  const entriesByBucket = await getEntriesByBuckets(entries)
  return entriesByBucket
}
