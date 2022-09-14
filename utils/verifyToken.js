const createError = require('../error');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = await req.cookies.access_token;
  if (!token) {
    return next(createError(404, 'You are not authenticated!'));
  }

  await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'));
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
