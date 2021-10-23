import path from 'path'

import { getAllFiles } from './utils/fs.js'
import { convertToJson } from './utils/yaml-parser.js'
import { getEventsMd } from './utils/md-formatter.js'
import json2md from 'json2md'

const __dirname = process.cwd()

export { json2md, generateGigs }

async function generateGigs() {
  const directoryPath = path.join(__dirname, 'pages')
  const allFiles = await getAllFiles(directoryPath)

  const entries = []
  for (const filePath of allFiles) {
    const json = await convertToJson(filePath)
    entries.push(json)
  }

  const entriesByBucket = await getEntriesByBuckets(entries)
  const entriesForYearMarkdown = getEventsMd(entriesByBucket.bucketsYear)
  return entriesForYearMarkdown
}

async function getEntriesByBuckets(entries) {
  const bucketsYear = {}
  // const bucketsAll = []
  // const bucketsType = {}
  // const bucketsLanguage = {}
  // const bucketsCountry = {}

  for (const entry of entries) {
    const { attributes } = entry
    const { date } = attributes

    const year = new Date(date).getFullYear()
    if (bucketsYear[year] === undefined) {
      bucketsYear[year] = {
        year: year,
        items: [entry]
      }
    } else {
      bucketsYear[year].items.push(entry)
    }
  }

  return {
    bucketsYear
  }
}
