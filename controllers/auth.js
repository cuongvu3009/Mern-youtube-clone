const User = require('../models/User');
const createError = require('../error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(createError(404, 'Please provide name, email and password'));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json(user);
};

const signIn = async (req, res, next) => {
  //check if user exist
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(createError(404, 'User not found!'));
  }

  //check password correct
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return next(createError(400, 'Wrong credential, try again!'));
  }

  //create token
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  const { password, ...other } = user._doc;
  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(201)
    .json(other);
};

const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const savedUser = newUser.save();
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (error) {
    return next(createError(500, 'Something went wrong, try again!'));
  }
};

module.exports = { signIn, signUp, googleAuth };
