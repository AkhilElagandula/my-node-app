const Category = require("../../models/Category");

// Add a new category
exports.addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if the category already exists
    const isCategoryExists = await Category.exists({ name });
    if (isCategoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const category = new Category({ name, description });
    await category.save();

    return res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    console.error("Error adding category:", error.message);
    next(error);
  }
};

// Update an existing category
exports.updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    // Validate input
    if (!categoryId || isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid or missing categoryId" });
    }

    // Find and update the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Error updating category:", error.message);
    next(error);
  }
};

// Delete an existing category
exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    // Validate input
    if (!categoryId || isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid or missing categoryId" });
    }

    // Find and delete the category
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory: category,
    });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    next(error);
  }
};