document.body.onload = async () => {
  todo()
  document.getElementById("btnShow").addEventListener("click", todo)
}

function drawProgress(week) {
  // 1672534800 -> 1.1.23
  // 1704063539 -> 31.12.23
  //   31528739 -> one year
  //     604800 -> one week

  if (week == -1) {
    return 0
  }

  week = document.getElementById(week)
  let filling = document.createElement('div')

  
  filling.className = 'filling'
  filling.style.height += 15 + 'px'

  week.append(filling)
}

function epochToWeek(epoch) {
  // Get the current year from the browser
  const currentYear = document.getElementById("tbYear").value
  // Get the timestamp (epoch time) of January 1st
  const januaryFirst = new Date(currentYear, 0, 1)
  // Get the timestamp of December 31st
  const decemberLast = new Date(currentYear, 11, 31)


  let firstYearDay = parseInt(januaryFirst.getTime().toString().slice(0, -3))
  let lastYearDay = parseInt(decemberLast.getTime().toString().slice(0, -3))

  if (epoch > firstYearDay && epoch < lastYearDay) {
    let yearDiff = epoch - firstYearDay
    let weekSec = 604800
    return Math.floor(yearDiff / weekSec) + 1
  }
  return -1

}

async function fetchTracker() {
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

async function todo() {
  let trackerObj = await fetchTracker()
  trackerObj = trackerObj.history
  console.log(trackerObj)
  trackerObj.forEach(async el => {
    el.currDate = parseInt(el.currDate.toString().slice(0, -3))
    let week = epochToWeek(el.currDate)
    drawProgress(week)
  })
}