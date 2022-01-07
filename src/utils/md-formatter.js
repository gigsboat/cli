import json2md from 'json2md'
import { getConfig } from '../../bin/config-manager.js'

json2md.converters.rawHTML = function (input) {
  return input
}

export function formatToMarkdown(data) {
  return json2md(data)
}

export async function getEventsMd(events) {
  let markdownEventsContent = ''
  for (const yearlyItems of events) {
    const eventsByYear = await eventsListForYear(yearlyItems)
    markdownEventsContent += eventsByYear + '\n'
  }

  const markdown = getTableOfContents(events) + '\n' + markdownEventsContent
  return markdown
}

function getTableOfContents(events) {
  const tableOfContents = []
  tableOfContents.push({
    h1: 'Table of Contents'
  })

  const markdownYearsItems = []
  for (const yearlyItems of events) {
    markdownYearsItems.push(
      `[Year of ${yearlyItems.year}](#${yearlyItems.year}) - total events ${yearlyItems.stats.total}`
    )
  }

  tableOfContents.push({
    ul: markdownYearsItems
  })

  return json2md(tableOfContents)
}

export function getStatsBadges(events) {
  const statsBadges = []

  const badgeForTotalEvents = events.stats.total
    ? `![Total Events](https://img.shields.io/badge/total-${events.stats.total}-blue?style=flat-square)`
    : 0
  const badgeForTotalConferences = events.stats.total_conference
    ? `![Total Conferences](https://img.shields.io/badge/conferences-${events.stats.total_conference}-red?style=flat-square)`
    : 0
  const badgeForTotalPodcasts = events.stats.total_podcast
    ? `![Total Podcasts](https://img.shields.io/badge/podcasts-${events.stats.total_podcast}-yellow?style=flat-square)`
    : 0
  const badgeForTotalWebinars = events.stats.total_webinar
    ? `![Total Webinars](https://img.shields.io/badge/webinars-${events.stats.total_webinar}-lightgrey?style=flat-square)`
    : 0
  const badgeForTotalMeetups = events.stats.total_meetup
    ? `![Total Meetups](https://img.shields.io/badge/meetups-${events.stats.total_meetup}-violet?style=flat-square)`
    : 0
  const badgeForTotalArticles = events.stats.total_article
    ? `![Total Podcasts](https://img.shields.io/badge/articles-${events.stats.total_article}-green?style=flat-square)`
    : 0
  const badgeForTotalWorkshops = events.stats.total_workshop
    ? `![Total Workshops](https://img.shields.io/badge/workshops-${events.stats.total_workshop}-orange?style=flat-square)`
    : 0

  statsBadges.push({
    p: `${badgeForTotalEvents ? badgeForTotalEvents : ''} ${
      badgeForTotalMeetups ? badgeForTotalMeetups : ''
    } ${badgeForTotalConferences ? badgeForTotalConferences : ''} ${
      badgeForTotalPodcasts ? badgeForTotalPodcasts : ''
    } ${badgeForTotalWebinars ? badgeForTotalWebinars : ''} ${
      badgeForTotalArticles ? badgeForTotalArticles : ''
    } ${badgeForTotalWorkshops ? badgeForTotalWorkshops : ''}`
  })

  return json2md(statsBadges) + '\n'
}

async function eventsListForYear(eventsOfYear) {
  const gigsConfig = await getConfig()

  const eventsByYear = []
  let eventsImageGalleryItems = []

  eventsByYear.push({
    h1: eventsOfYear.year
  })
  eventsByYear.push(getStatsBadges(eventsOfYear))

  const eventsTableEntries = []
  eventsOfYear.items.forEach((event) => {
    const eventDate = `${event.attributes.date.getUTCFullYear()}-${
      event.attributes.date.getMonth() + 1
    }-${event.attributes.date.getDate()}`

    const pathToFileOnGitHub = encodeURI(event.fileRelativePath)

    eventsTableEntries.push({
      Date: eventDate,
      Event: event.attributes.name,
      Title: event.fileRelativePath
        ? `[${event.attributes.title}](${pathToFileOnGitHub})`
        : event.attributes.title,
      Slides: event.attributes.slides_url
        ? `[Slides](${event.attributes.slides_url})`
        : '',
      Recording: event.attributes.recording_url
        ? `[Recording](${event.attributes.recording_url})`
        : '',
      Location: event.attributes.country_code
        ? event.attributes.country_code
        : '',
      Language: event.attributes.language ? event.attributes.language : ''
    })

    if (event.attributes.images) {
      const imagesList = event.attributes.images.filter((item) => !!item)
      eventsImageGalleryItems = eventsImageGalleryItems.concat(imagesList)
    }
  })

  if (gigsConfig.output.includePictureGalleryYearly === true) {
    let tableItems = []
    let tableHTML = ''

    for (let i = 0; i <= eventsImageGalleryItems.length - 1; i + 7) {
      tableItems.push(eventsImageGalleryItems.splice(i, 8))
    }

    if (tableItems.length) {
      tableHTML += '<table>' + '\n'
      tableItems.forEach((itemsRow) => {
        if (itemsRow.length) {
          tableHTML += '  <tr>' + '\n'
          itemsRow.forEach((item) => {
            tableHTML +=
              `    <td align="center"> <img src="${item}" width="85" height="50" /> </td>` +
              '\n'
          })
          tableHTML += '  </tr>' + '\n'
        }
      })
      tableHTML += '</table>' + '\n'
    }

    eventsByYear.push(json2md({ rawHTML: tableHTML }))
  }

  eventsByYear.push({
    table: {
      headers: [
        'Date',
        'Event',
        'Title',
        'Slides',
        'Recording',
        'Location',
        'Language'
      ],
      rows: eventsTableEntries
    }
  })

  return json2md(eventsByYear) + '\n'
}
