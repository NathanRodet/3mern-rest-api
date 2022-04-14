const express = require('express');
const router = express.Router();
const jwtMethod = require('../utils/jwt');

/* Tests */
router.get('/', function (req, res, next) {
  res.send('GET /test');
  next();
});

router.post('/', jwtMethod.authenticateToken, function (req, res, next) {
  res.send('POST /test');
  next();
});

router.delete('/', jwtMethod.authenticateToken, function (req, res, next) {
  res.send('DELETE /test');
  next();
});

router.put('/', jwtMethod.authenticateToken, function (req, res, next) {
  res.send('PUT /test');
  next();
});

router.patch('/', jwtMethod.authenticateToken, function (req, res, next) {
  res.send('PATCH /test');
  next();
});

module.exports = router;
