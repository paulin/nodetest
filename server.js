const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');  // Ensure this path is correct
const dynamicRoutes = require('./routes/dynamicRoutes');  // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Use dynamic routes
app.use('/api', dynamicRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));