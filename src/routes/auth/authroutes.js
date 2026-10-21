const express = require('express');
const router = express.Router();
const { staffSignup, staffLogin } = require('../../controllers/auth/staffAuthController');

router.post('/signup', staffSignup);
router.post('/login', staffLogin);

module.exports = router;