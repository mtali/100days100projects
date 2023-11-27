const appEl = document.getElementById('app');
const btnEl = document.getElementById('btn');


getNotes().forEach((note) => {
    const noteEl = createNoteElement(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

function createNoteElement(id, content) {
    // <textarea cols="30" rows="10" class="note" placeholder="Empty Note"></textarea>
    const element = document.createElement('textarea');
    element.classList.add('note');
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener('dblclick', () => {
        const warning = confirm('Do you want to delete this note');
        if (warning) {
            deleteNote(id, element);
        }
    });

    element.addEventListener('input', e => {
        updateNote(id, element.value);
    });

    return element;
}


function getNotes() {
    return JSON.parse(localStorage.getItem('note-app') || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter(note => note.id === id)[0];
    target.content = content;
    saveNotes(notes)
}
function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id !== id)
    saveNotes(notes);
    appEl.removeChild(element);
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const newEl = createNoteElement(noteObj.id, noteObj.content);
    appEl.insertBefore(newEl, btnEl);

    notes.push(noteObj);
    saveNotes(notes);
}

btnEl.addEventListener('click', addNote);
