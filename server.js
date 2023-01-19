const express = require('express');
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile} = require('./helpers/fsUtils'); 

const path = require('path');

const app = express();
const PORT = process.env.port || 3001;

//Middleware for parsing JSON on urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

//GET Route for homepage
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST request for new notes
app.post('/api/notes', (req, res) => {
  const {title, content} = req.body;
  
  if (title && content) {
    const newNote = {
      title,
      content,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

