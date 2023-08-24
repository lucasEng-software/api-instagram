const { Router } = require('express');

const routes = new Router();
routes.get('/health', (req, res) => res.send({ message: 'Conectado com sucsso!' }));
module.exports = routes;
