export { createYearBuckets, getEventsStats }

function sortByDateOrYear(a, b) {
  if (a.hasOwnProperty('year') && b.hasOwnProperty('year')) {
    return new Date(b.year) - new Date(a.year)
  } else {
    return new Date(b.attributes.date) - new Date(a.attributes.date)
  }
}

function getEventsStats(entries) {
  const stats = {
    total: entries.length,
    total_podcast: 0,
    total_conference: 0,
    total_webinar: 0,
    total_meetup: 0,
    total_article: 0,
    total_workshop: 0,
    total_other: 0
  }

  for (const entry of entries) {
    const { attributes } = entry
    const { type } = attributes

    if (type === 'podcast') {
      stats.total_podcast += 1
    } else if (type === 'conference') {
      stats.total_conference += 1
    } else if (type === 'webinar') {
      stats.total_webinar += 1
    } else if (type === 'meetup') {
      stats.total_meetup += 1
    } else if (type === 'article') {
      stats.total_article += 1
    } else if (type === 'workshop') {
      stats.total_workshop += 1
    } else {
      stats.total_other += 1
    }
  }

  return stats
}

function createYearBuckets(entries) {
  const bucketsYear = {}

  // sort entries by date in descending order
  entries.sort(sortByDateOrYear)

  // loop them to gather them into yearly buckets
  for (const entry of entries) {
    const { attributes } = entry
    const { date } = attributes

    const year = String(new Date(date).getFullYear())
    if (bucketsYear[year] === undefined) {
      bucketsYear[year] = {
        year: year,
        items: [entry]
      }
    } else {
      bucketsYear[year].items.push(entry)
    }
  }

  // augment the yearlyItems with stats
  for (const year of Object.keys(bucketsYear)) {
    const { items } = bucketsYear[year]
    bucketsYear[year].stats = getEventsStats(items)
  }

  // loop over the yearly buckets and sort those in yearly descending order
  const yearlyItems = Object.values(bucketsYear)
  yearlyItems.sort(sortByDateOrYear)

  return yearlyItems
}
