const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Linker = require('../views/linker');

const routes = express.Router();

routes.use(authMiddleware);

routes.post('/', Linker.create);

routes.get('/by-user', Linker.readAllByUser);

routes.put('/:oldLabel', Linker.update);

routes.delete('/:label', Linker.delete);

module.exports = app => app.use('/linkers', routes);
