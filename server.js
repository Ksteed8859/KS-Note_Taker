const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/routes_index')

const app = express();
const PORT = process.env.port || 3001;

//Middleware for parsing JSON on urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.use(express.static('public'));

//GET Route for homepage
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

