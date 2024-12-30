const express = require('express');
const router = express.Router();
const {addCategory, updateCategory, deleteCategory} = require('../controllers/category/categoryController');
const {isAdmin} = require('../middleware/authMiddleware');

// Admin route to add a category
router.post('/add', isAdmin, addCategory);
router.put('/update/:categoryId', isAdmin, updateCategory);
router.delete('/delete/:categoryId', isAdmin, deleteCategory);

module.exports = router;