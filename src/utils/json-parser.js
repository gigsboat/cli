export async function getJsonFormat({gigsData}) {
    let totalEventsData = {}

    const dataByYear = formatJson(gigsData)
    totalEventsData.byYear = dataByYear;
    totalEventsData.stats = gigsData.stats;
      
    return totalEventsData
}

function formatJson(gigsData) {
    let dataByYear = {}
    
    dataByYear = gigsData.bucketsByYear.map((yearlyEntries) => {

        let yearlyItems = []
        for (const yearlyItem of yearlyEntries.items) {
            yearlyItems.push(yearlyItem.attributes)
        }

        return {
            year: yearlyEntries.year,
            items: yearlyItems
        }
    })    

    return dataByYear
}