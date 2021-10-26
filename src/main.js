import path from 'path'

import { getAllFiles } from './utils/fs.js'
import { convertToJson } from './utils/yaml-parser.js'
import { getEventsMd, formatToMarkdown } from './utils/md-formatter.js'

export { formatToMarkdown, generateGigs, generateDocument }

async function generateDocument({ sourceDirectory, preContent, postContent }) {
  let markdownOutputPreContent = ''
  let markdownOutputPostContent = ''
  let document = ''

  const eventsMarkdown = await generateGigs({ sourceDirectory })

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

async function generateGigs({ sourceDirectory }) {
  let directoryPath = path.join(process.cwd(), sourceDirectory)
  if (path.isAbsolute(sourceDirectory)) {
    directoryPath = sourceDirectory
  }

  const allFilesFlatList = await getAllFiles(directoryPath)

  const entries = []
  for (const filePath of allFilesFlatList) {
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
