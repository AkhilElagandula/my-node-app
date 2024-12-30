const express = require('express');
const router = express.Router();
const {
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require('../controllers/category/subCategoryController');

// Add a subcategory to a category
router.post('/add/:categoryId', addSubcategory);

// Update a subcategory
router.put('/update/:subCategoryId', updateSubcategory);

// Delete a subcategory
router.delete('/delete/:subCategoryId', deleteSubcategory);

module.exports = router;
