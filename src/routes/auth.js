const { Router } = require('express');

const { login, signUp } = require('../controllers/auth');

const authRouter= Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);

module.exports = authRouter;