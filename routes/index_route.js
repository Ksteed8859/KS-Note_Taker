const express = require('express');

const notesRoute = require('./notes_route');

const app = express();

app.use('/notes', notesRoute);

module.exports = app;