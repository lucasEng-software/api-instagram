const { Router } = require('express');
const AuthenticationMiddleware = require('./apps/middlewares/authentication');

const UserController = require('./apps/controllers/UserController');
const AuthenticationController = require('./apps/controllers/AuthenticationController');
const UserModel = require('./apps/models/User');


const schemaValidator = require('./apps/middlewares/schemavalidator');
const userSchema = require('./schema/create.user.schema.json')
const authSchema = require('./schema/auth.schema.json')

const routes = new Router();



routes.post('/auth', schemaValidator(authSchema),AuthenticationController.authentication);

routes.post('/user', schemaValidator(userSchema), UserController.create);

routes.use(AuthenticationMiddleware);
routes.put('/user', UserController.update)
routes.get('/user', UserController.list);
routes.delete('/user/:id', UserController.delete);

routes.get('/health', (req, res) => res.send({ message: 'Conectado com sucesso!' }));
module.exports = routes;
