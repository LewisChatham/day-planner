let todaysDate = moment().format("dddd, MMMM Do")
let timeNow = moment().format("H")
let calendarEl = $("#calendar")

$("#date").text(todaysDate);

for (let i = 9; i <=17; i++) {
    let row = createRow(i)

    let hourCol = createHour(i)

    let eventCol = createEvent(i)

    let saveCol = createSave()

    row.append(hourCol)
    row.append(eventCol)
    row.append(saveCol)
    calendarEl.append(row)
}

$(".save").on("click", saveItem)

function saveItem(e) {
    let parent = e.target.parentElement
    let index = parent.getAttribute("data-time")
    let eventEl = parent.getElementsByTagName('input')[0]
    let value = eventEl.value

    localStorage.setItem(`event-${index}`, value)
}


function createRow(i) {
    let row = $("<div>")
    row.addClass("row")
    row.addClass("hour-row")
    row.attr("data-time", i)
    return row
}

function createHour(i) {
    let hourCol = $("<div>")
    hourCol.addClass("col-lg-1")
    hourCol.addClass("hour")
    hourCol.text(moment(i, "h").format("ha"))
    return hourCol
}

function createEvent(i) {
    let event = localStorage.getItem(`event-${i}`)
    let eventCol = $("<input>")
    eventCol.addClass("col-lg-10")
    eventCol.addClass("event")
    if (timeNow > i) {
        eventCol.addClass("past")
    } else if (timeNow < i) {
        eventCol.addClass("future")
    } else {
        eventCol.addClass("present")
    }
    eventCol.attr("value", event)
    return eventCol
}

function createSave() {
    let saveCol = $("<div>")
    saveCol.addClass("col-lg-1")
    saveCol.addClass("save") 
    let saveBtn = $("<i>")
    saveBtn.addClass("far fa-save")
    saveBtn.addClass("saveBtn")
    saveCol.append(saveBtn)
    return saveCol
}