const express = require('express');
const router = express.Router();
const { createAdmin } = require('../controllers/admin/adminController');
const { isAdmin } = require('../middleware/authMiddleware');

// Route to create an admin user
router.post('/create', isAdmin, createAdmin);

module.exports = router;
