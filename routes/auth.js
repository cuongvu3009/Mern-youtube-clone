const express = require('express');
const router = express.Router();

const { signIn, signUp } = require('../controllers/auth');

//CREATE A USER
router.post('/signup', signUp);

//SIGN IN
router.post('/signin', signIn);

module.exports = router;
