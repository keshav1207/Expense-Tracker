const express = require('express');
const cors = require('cors');
const routes = require('./routes/route');
const connection = require('./config/connect');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());



// Routes
app.use(routes);

//Connecting to Mysql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Gracefully shutting down');
  connection.end(err => {
    if (err) {
      console.error('Error occurred during connection pool shutdown', err);
    } else {
      console.log('Connection pool closed');
      process.exit(0);
    }
  });
});

// Define port
const PORT =  5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




