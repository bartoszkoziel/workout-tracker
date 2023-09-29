let types = ["push", "pull", "squat", "core", "bridge", "twist", "climbing", "bike", "plank"]

document.body.onload = () => {
    fillSelect()
    document.getElementById('btnSubmit').addEventListener("click", handleClick)
}

const fillSelect = () => {
    let select = document.getElementById('selType')

    types.forEach(item => {
        let option = document.createElement("option")
        option.setAttribute("value", item)
        option.innerHTML = item

        select.append(option)
    })
}

const handleClick = () => {
    let type = document.getElementById("selType").value
    let progression = document.getElementById("tbProgression").value
    let repstime = document.getElementById("tbRepsTime").value
    let currentdate = Date.now();

    let workoutObj = {
        "type": type,
        "progression": progression,
        "repstime": repstime,
        "currDate": currentdate
    }

    const body = JSON.stringify(workoutObj)
    const headers = { "Content-Type": "application/json" }
    // console.log(body)

    let wynik = fetch("/handleUpload", { method: 'post', body, headers })
        .then(data => {
            response = data.text()
            console.log("DATA: ", data);
            console.log("RESPONSE: ", response);
            return response
        })
    
    console.log(wynik)
}