const express = require('express');
const router = express.Router();

const { signIn, signUp, googleAuth } = require('../controllers/auth');

//CREATE A USER
router.post('/signup', signUp);

//SIGN IN
router.post('/signin', signIn);

//GOOGLE AUTH
router.post('/google', googleAuth);

module.exports = router;
