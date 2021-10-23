import json2md from 'json2md'

export function getEvents(events) {
  let markdownEventsContent = ''
  for (const year of Object.keys(events)) {
    const eventsByYear = eventsListForYear(events[year])
    markdownEventsContent += eventsByYear + '\n'
  }

  return markdownEventsContent
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
        ? `[Slides](${event.attributes.slides_url}`
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

  return json2md(eventsByYear)
}
