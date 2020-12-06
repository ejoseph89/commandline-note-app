// REQUIRED MODULES
const fs = require('fs');
const chalk = require('chalk');

//************************COMMANDS************************* */
// ADD NOTE
const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
};

// REMOVE NOTE
const removeNote = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title)

  if(notesToKeep.length < notes.length) {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(notesToKeep)
  } else if (notesToKeep.length == notes.length) {
    console.log(chalk.red.inverse('No note found!'));
  }
}

// LIST NOTES
const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.blue.inverse('Your Notes: '))
  notes.forEach((note) => {
    console.log(note.title)
  })
}

// READ NOTE
  const readNote = (title) => {
    const notes = loadNotes()

    const requestedNote = notes.find((note) => note.title === title)

    if (!requestedNote) {
      console.log(chalk.red.inverse('No notes found!'))
      } else {
      console.log(chalk.green.inverse(requestedNote.title))
      console.log(requestedNote.body)
    }
  }


//************************UTILITIES************************* */
// LOAD NOTES
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

// SAVE NOTES
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

// EXPORTS
module.exports = {
  addNotes: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};