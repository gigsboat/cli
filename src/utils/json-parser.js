export async function getJsonFormat({gigsData}) {
    const totalEventsData = formatJson(gigsData)      
    return totalEventsData
}

function formatJson(gigsData) {
    let data = {}
    data.items = []
    
    for (const yearlyEntries of gigsData.bucketsByYear) {

        for (const yearlyItem of yearlyEntries.items) {
            data.items.push(yearlyItem.attributes)
        }
    }

    data.stats = gigsData.stats

    return data
}