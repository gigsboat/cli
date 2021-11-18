import json2md from 'json2md'

export function formatToMarkdown(data) {
  return json2md(data)
}

export function getEventsMd(events) {
  let markdownEventsContent = ''
  for (const yearlyItems of events) {
    const eventsByYear = eventsListForYear(yearlyItems)
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
      `[Events in ${yearlyItems.year}](#${yearlyItems.year})`
    )
  }

  tableOfContents.push({
    ul: markdownYearsItems
  })

  return json2md(tableOfContents)
}

function eventsListForYear(eventsOfYear) {
  const eventsByYear = []
  eventsByYear.push({
    h1: eventsOfYear.year
  })
  eventsByYear.push({
    p: `[${eventsOfYear.items.length}] total events for ${eventsOfYear.year}`
  })

  const eventsTableEntries = []
  eventsOfYear.items.forEach((event) => {
    const eventDate = `${event.attributes.date.getUTCFullYear()}-${
      event.attributes.date.getMonth() + 1
    }-${event.attributes.date.getDate()}`

    eventsTableEntries.push({
      Date: eventDate,
      Event: event.attributes.name,
      Title: event.attributes.title,
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
  })

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
