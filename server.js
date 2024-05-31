const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Adjust path if needed
const dynamicRoutes = require('./dynamicRoutes'); // Adjust path if needed

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Sample API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend' });
});