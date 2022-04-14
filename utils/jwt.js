const jwt = require('jsonwebtoken');
require('dotenv/config');

// Generate access token to bypass middleware authentication

function generateAccessToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin
    },
    process.env.SECRET_TOKEN,
    { expiresIn: process.env.SECRET_TOKEN_DURATION }
  )
  return token
}

// authenticate access token

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send("No token found");
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    return next();
  })
}

module.exports = { authenticateToken, generateAccessToken };

// Sources : https://www.youtube.com/watch?v=GXokEYwbOwA&ab_channel=WawaSensei