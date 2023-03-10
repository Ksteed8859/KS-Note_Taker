const express = require('express');
const api = require('./routes/index_route.js');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware for parsing JSON on urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', api);

//GET Route for homepage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

