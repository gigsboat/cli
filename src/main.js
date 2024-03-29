import path from 'path'
import marked from 'marked'
import DebugLogger from 'debug'

import { getAllFiles } from './utils/fs.js'
import { convertToJson } from './utils/yaml-parser.js'
import {
  getEventsMd,
  formatToMarkdown,
  getStatsBadges
} from './utils/md-formatter.js'
import { createYearBuckets, getEventsStats } from './utils/content-manager.js'
import { getJsonFormat } from './utils/json-parser.js'
import { writeFile } from 'fs/promises'

export { formatToMarkdown, generateGigs, generateDocument }

const debug = DebugLogger('gigsboat:app')

async function generateDocument({ sourceDirectory, preContent, postContent }) {
  let markdownOutputPreContent = ''
  let markdownOutputPostContent = ''
  let document = ''

  const { entriesForYearMarkdown, entriesByBucket } = await generateGigs({
    sourceDirectory
  })

  const gigsJsonData = await getJsonFormat({ gigsData: entriesByBucket })
  gigsJsonData.generatedAt = new Date().toISOString()
  await writeFile('README.json', JSON.stringify(gigsJsonData, null, 2))

  if (preContent) {
    markdownOutputPreContent = processCustomContent({
      contents: preContent
    })
  }

  if (postContent) {
    markdownOutputPostContent = processCustomContent({
      contents: postContent
    })
  }

  const statsHeader = `<div align='center'>${marked.parse(
    getStatsBadges(entriesByBucket)
  )}</div>
  `

  const currentDate = new Date().toISOString()
  let footer = ''
  if (!process.env.TEST_E2E) {
    footer += `*page updated on ${currentDate}*\n\n`
  }
  footer += `powered by [gigsboat/cli](https://github.com/gigsboat/cli)`

  document +=
    statsHeader +
    markdownOutputPreContent +
    '\n' +
    entriesForYearMarkdown +
    '\n' +
    markdownOutputPostContent +
    '\n' +
    footer

  return document
}

function processCustomContent({ contents }) {
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
    debug('detected absolute path for source directory')
    directoryPath = sourceDirectory
  }

  const allFilesFlatList = await getAllFiles(directoryPath)

  const entries = []
  for (const filePath of allFilesFlatList) {
    const json = await convertToJson(filePath)

    // push the relative path to the file as part of the data object
    let fileDirectoryPath = path.relative(directoryPath, filePath)
    if (!path.isAbsolute(sourceDirectory)) {
      fileDirectoryPath = path.join(sourceDirectory, fileDirectoryPath)
    }
    json.fileRelativePath = fileDirectoryPath

    entries.push(json)
  }

  const entriesByBucket = await getEntriesByBuckets(entries)
  const entriesForYearMarkdown = await getEventsMd(
    entriesByBucket.bucketsByYear
  )
  return {
    entriesForYearMarkdown,
    entriesByBucket
  }
}

async function getEntriesByBuckets(entries) {
  // @TODO these buckets:
  //  const bucketsLanguage = {}
  //  const bucketsCountry = {}

  const bucketsByYear = createYearBuckets(entries)
  const statsTotal = getEventsStats(entries)

  return {
    bucketsByYear,
    stats: statsTotal
  }
}
