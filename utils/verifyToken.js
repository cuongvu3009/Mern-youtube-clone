const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = await req.cookies.access_token;

  if (!token) {
    return res.status(401).json('You are not authenticated!');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) res.status(403).json('Token is not valid!');
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
