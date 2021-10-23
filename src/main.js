import path from 'path'

import { getAllFiles } from './utils/fs.js'
import { convertToJson } from './utils/yaml-parser.js'
import { getEventsMd, formatToMarkdown } from './utils/md-formatter.js'

const __dirname = process.cwd()

export { formatToMarkdown, generateGigs, generateDocument }

async function generateDocument({ preContent, postContent }) {
  let markdownOutputPreContent = ''
  let markdownOutputPostContent = ''
  let document = ''

  const eventsMarkdown = await generateGigs()

  if (preContent) {
    markdownOutputPreContent = processCustomContent(preContent)
  }

  if (postContent) {
    markdownOutputPostContent = processCustomContent(postContent)
  }

  document +=
    markdownOutputPreContent + eventsMarkdown + markdownOutputPostContent

  return document
}

function processCustomContent(contents) {
  let markdownContent = ''
  for (const content of contents) {
    if (content.hasOwnProperty('raw')) {
      markdownContent += content.raw + '\n'
    }

    if (content.hasOwnProperty('format')) {
      markdownContent += formatToMarkdown(content.format) + '\n'
    }
  }

  return markdownContent
}

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
