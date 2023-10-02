let types = ["push", "pull", "squat", "core", "bridge", "twist", "climbing", "bike", "plank", "stretch"]
let currdate = Date.now()
let workoutObj = {
    currDate: currdate,
    arr: []
}

document.body.onload = () => {

    let btnSubmit = document.getElementById('btnSubmit')
    let btnAdd = document.getElementById('btnAdd')
    let btnClear = document.getElementById('btnClear')

    fillSelect()
    btnSubmit.addEventListener("click", handleSubmit)
    btnAdd.addEventListener("click", handleAdd)
    btnClear.addEventListener("click", handleClear)
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

const handleAdd = () => {
    let type = document.getElementById("selType").value
    let progression = document.getElementById("tbProgression").value
    let repstime = document.getElementById("tbRepsTime").value

    let exerciseObj = {
        type: type,
        progression: parseInt(progression),
        repstime: parseInt(repstime)
    }

    workoutObj.arr.push(exerciseObj)

    let lblExerciseArr = document.getElementById("lblExerciseArr")
    lblExerciseArr.innerHTML = JSON.stringify(workoutObj, null, "\t")
}

const handleSubmit = () => {
    if(workoutObj.arr.length > 0) {
        const body = JSON.stringify(workoutObj)
        const headers = { "Content-Type": "application/json" }
    
        let wynik = fetch("/handleUpload", { method: 'post', body, headers })
            .then(data => {
                response = data.text()
                console.log("DATA: ", data);
                console.log("RESPONSE: ", response);
                return response
            })
    
        console.log(wynik)
    }
}

const handleClear = () => {
    workoutObj = {
        currDate: currdate,
        arr: []
    }

    document.getElementById("lblExerciseArr").innerHTML = ""
}