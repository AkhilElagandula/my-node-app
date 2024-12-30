const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoute'));
app.use('/api/sub-categories', require('./routes/subCategoryRoutes'));


// Error Handling
app.use(require('./middleware/errorHandler'));

module.exports = app;