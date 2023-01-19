const express = require('express');

const notesRouter = require('./routes_notes')

const app = express();

app.use('/notes', notesRouter);

module.exports = app