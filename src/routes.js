const { Router } = require('express');

const UserController = require('./apps/controllers/UserController')
const UserModel = require('./apps/models/User');

const schemaValidator = require('./apps/middlewares/schemavalidator');
const userSchema = require('./schema/create.user.schema.json')

const routes = new Router();

routes.get('/health', (req, res) => res.send({ message: 'Conectado com sucsso!' }));

routes.get('/user', UserController.list);
routes.post('/user', schemaValidator(userSchema), UserController.create);

module.exports = routes;
