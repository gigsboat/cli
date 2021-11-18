export { createYearBuckets }

function sortByDateOrYear(a, b) {
  if (a.hasOwnProperty('year') && b.hasOwnProperty('year')) {
    return new Date(b.year) - new Date(a.year)
  } else {
    return new Date(b.attributes.date) - new Date(a.attributes.date)
  }
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

  // loop over the yearly buckets and sort those in yearly descending order
  const yearlyItems = Object.values(bucketsYear)
  yearlyItems.sort(sortByDateOrYear)

  return yearlyItems
}
