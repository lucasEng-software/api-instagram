const { Router } = require('express');
const UserModel = require('./apps/models/User');

const routes = new Router();
routes.get('/health', (req, res) => res.send({ message: 'Conectado com sucsso!' }));


routes.get('/users', async (req, res) => {
    const allUsers = await UserModel.findAll();
    res.send({users:allUsers});
});
module.exports = routes;
