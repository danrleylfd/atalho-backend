const express = require('express');
const routes = express.Router();
const Auth = require('../views/auth');

routes.post('/signup', Auth.signUp);

routes.post('/signin', Auth.signIn);

routes.post('/forgot_password_token', Auth.forgotPasswordToken);

routes.post('/forgot_password_otp', Auth.forgotPasswordOTP);

routes.post('/reset_password', Auth.resetPassword);

routes.put('/edit_account', Auth.editAccount);

routes.delete('/delete_account', Auth.deleteAccount);

module.exports = app => app.use('/auth', routes);
