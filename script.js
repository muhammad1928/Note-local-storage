const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');

/* getting all previous notes if any and showing them on webpage */
getNote().forEach((note) =>{
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

/* creating the function that is going to create the note */
function createNoteEl(id, content){
    /*creating element */
    const element = document.createElement('textarea'); /* creating new element (textarea) */
    element.classList.add('note'); /* adding class to the text area */
    element.placeholder = 'Empty note'; /* creating a placeholder to the note */
    element.value = content;
    console.log('create note el')
    /* adding event listener on doubleclick *//* calling a delete function to double click  */
    element.addEventListener('dblclick',() =>  {
        console.log('double click');
        /* creating a warning popup */
        const warning = confirm('Do you want to delete this note?');
        /*if warning is true */
        if(warning){
            deleteNote(id, element);
        }
    });

    /* creating event listener to call updateNote function each time a change happens */
    element.addEventListener('input', ()=>{
        console.log(element.value[element.value.length-1]); /* console log the last element of array */
        updateNote(id, element.value) /* calling the updateNote function and passing id and element.value */
    });

    return element;
};

/* creating deleting function */
function deleteNote(id, element){
    const notes = getNote().filter((note)=>note.id != id); /* get all elements which is not equal to our id */
    saveNote(notes); /* saving all the notes expect the one we wanted to delete ( basically deleting the unwanted note*/
    appEl.removeChild(element) /* deleting the deleted element from html */
};

/* creating update function */
function updateNote(id, content) {
    const notes = getNote();
    const target = notes.filter((note)=> note.id ==id)[0]; /* it is returning one element cuz we only have one, but we still target first element just in case */
    target.content = content;  /* equallizing the content of notes to new content */
    saveNote(notes) /* saving notes, passing the note */
};

/*creating a function that is going to happen when the btton is clicked */
function addNote(){
    const notes = getNote(); /* getting all notes on local storage to not accidentally delete previous notes */
    /* creating data of a note object */
    const noteObj = {
        /* creating id  by using random id numbers */
        id: Math.floor(Math.random() * 100000),
        content: '',
    };
    
    const noteEl = createNoteEl(noteObj.id, noteObj.content);

    /* addding new text area inside the div, before the button */
    appEl.insertBefore(/*what to put*/ noteEl, /*where to put */ btnEl);

    notes.push(noteObj);
    /* creating a save function to save all notes on local storage */
    saveNote(notes);


};

function saveNote(notes) {
    localStorage.setItem('note-app', JSON.stringify(notes)); /* setting up a key for the note app. we are using json.stringify to avoid users to write codes */
    
}

function getNote(){
    return JSON.parse(localStorage.getItem('note-app') ||'[]'); /* parse means to opposite of stringify */
}
btnEl.addEventListener('click', addNote);