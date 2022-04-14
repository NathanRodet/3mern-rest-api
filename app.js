const express = require('express');
const db = require('./utils/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Configuration
const port = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.use(cors());

// Routes

// Import routes
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const missionsRouter = require('./routes/missions');
const roversRouter = require('./routes/rovers');
const testsRouter = require('./routes/tests');

// Used to match RFC2324 standard (HTCPCP protocol)
// https://datatracker.ietf.org/doc/html/rfc2324

app.get('/teapot', function (req, res) {
  try {
    res.status(418).send("I'm a teapot!");
  } catch (error) {
    res.status(500).json({ message: error })
  }
});
app.get('/hellothere', function (req, res) {
  try {
    res.status(200).send("General Kenobi !");
  } catch (error) {
    res.status(500).json({ message: error })
  }
});
app.get('/ring', function (req, res) {
  try {
    res.status(200).send("One ring to rule them all");
  } catch (error) {
    res.status(500).json({ message: error })
  }
});

// Login
app.use('/login', loginRouter);
// User
app.use('/users', usersRouter);
// Mission
app.use('/missions', missionsRouter);
// Rover
app.use('/rovers', roversRouter);
// Tests API
app.use('/tests', testsRouter);

app.listen(port, () => {
  console.log('Server listening on port ' + port + " | http://localhost:" + port)
});