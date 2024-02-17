const express = require('express');
const cors = require('cors');
const routes = require('./routes/route');


// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());



// Routes
app.use(routes);

// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
