const express = require('express');
const router = express.Router();

const { register, login, getMe, refresh, logout } = require('../controllers/auth.controller');
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');
const authenticate = require('../middlewares/authenticate');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', authenticate, getMe);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;