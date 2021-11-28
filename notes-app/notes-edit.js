let noteID = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function(note) {
    return note.id == noteID
})

if(note == undefined){
    location.assign("/index.html")
}

document.querySelector("#note-title").value = note.title
document.querySelector("#note-body").value = note.body
document.querySelector("#last-edited").textContent = "Last edited at " + moment(note.updatedAt).fromNow()


document.querySelector("#note-title").addEventListener("input", function(e){
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    document.querySelector("#last-edited").textContent = "Last edited at " + moment(note.updatedAt).fromNow()
    saveNotes(notes)
})
document.querySelector("#note-body").addEventListener("input", function(e){
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    document.querySelector("#last-edited").textContent = "Last edited at " + moment(note.updatedAt).fromNow()
    saveNotes(notes)
})

const button = document.createElement('button')
button.textContent = 'Remove Note'
document.querySelector("#remove").appendChild(button)
button.addEventListener('click', function () {
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")
})

window.addEventListener("storage", function(e){
    if(e.key == "notes") {
        notes = getSavedNotes()
        note = notes.find(function(note) {
            return note.id == noteID
        })
        
        if(note == undefined){
            location.assign("/index.html")
        }
        
        document.querySelector("#note-title").value = note.title
        document.querySelector("#note-body").value = note.body
        document.querySelector("#last-edited").textContent = "Last edited at " + moment(note.updatedAt).fromNow()
    }
})