// Used the mysql2 package instead of mysql because the latter was causing the error ER_NOT_SUPPORTED_AUTH_MODE: 
// Client does not support authentication protocol requested by server,

const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'expense_tracker'
});

module.exports = connection;

