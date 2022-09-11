const express = require('express');

const Linker = require('../views/linker');

const routes = express.Router();

routes.get('/:label', Linker.read);

module.exports = app => app.use('/', routes);
