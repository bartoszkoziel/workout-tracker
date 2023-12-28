document.body.onload = async () => {
  let trackerObj = await fetchTracker()
  trackerObj = trackerObj.history
  console.log(trackerObj)

  trackerObj.forEach(async el => {
    el.currDate = parseInt(el.currDate.toString().slice(0, -3))
    let week = epochToWeek(el.currDate)
    drawProgress(week)
  })
}

function drawProgress (week) {
  // 1672534800 -> 1.1.23
  // 1704063539 -> 31.12.23
  //   31528739 -> one year
  //     604800 -> one week
  week = document.getElementById(week)
  let filling = document.createElement('div')
  // let currentHeight = parseInt(filling.style.height.slice(0, -2))

  filling.className = 'filling'
  filling.style.height += 15 + 'px'

  week.append(filling)
}

function epochToWeek (epoch) {
  // Get the current year from the browser
  const currentYear = new Date().getFullYear()
  // Create a new Date object for January 1st of the current year
  const januaryFirst = new Date(currentYear, 0, 1)
  // Get the timestamp (epoch time) of January 1st
  const januaryFirstTimestamp = januaryFirst.getTime()

  let firstYearDay = parseInt(januaryFirst.getTime().toString().slice(0, -3))

  let yearDiff = epoch - firstYearDay
  let weekSec = 604800

  return Math.floor(yearDiff / weekSec) + 1
}

async function fetchTracker () {
  try {
    // Fetch data from the /tracker.json endpoint
    const response = await fetch('/tracker.json')

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      )
    }

    // Parse the JSON data from the response
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}
