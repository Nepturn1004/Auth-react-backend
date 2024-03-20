const express = require('express');
const router = express.Router();
const userController = require('../controller/auth.controller');
const authController = require('../controller/auth.controller');

router.get('/', authController.default);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
console.log('routes');

module.exports = router;
