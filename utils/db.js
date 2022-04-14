const mongoose = require('mongoose');
require('dotenv/config');
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// Connect to DB or throw errors
const db = mongoose.connect(dbConnectionString,
  (error) => {
    error ? console.log(error) : console.log("Server connected to DB");
  },
);

module.exports = db;