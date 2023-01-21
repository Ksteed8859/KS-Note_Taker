const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

//GET Route for retrieving all saved notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//GET Route for retrieving a specific note
notes.get('/:id', (req, res) => {
    const notesID = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id === notesID);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

//DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
    const notesID = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== notesID);
        writeToFile('./db/db.json', result);
        res.json(`Note ${notesID} has been deleted`);
    })
})

// POST Route for a new note
notes.post('/', (req, res) => {
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id : uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;