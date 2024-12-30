const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");

// Add a subcategory
exports.addSubcategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    // Validate input
    if (!categoryId || isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid parent category ID" });
    }
    if (!name) {
      return res.status(400).json({ message: "Subcategory name is required" });
    }

    // Check if the parent category exists in either Category or SubCategory
    const category =
      await Category.findOne({ categoryId }) ||
      await SubCategory.findOne({ subCategoryId: categoryId });

    if (!category) {
      return res.status(404).json({ message: "Parent category not found" });
    }

    // Check if a subcategory with the same name already exists
    const isSubcategoryExists = await SubCategory.exists({
      name: name.toLowerCase(),
      categoryId,
    });

    if (isSubcategoryExists) {
      return res.status(400).json({ message: "Subcategory already exists" });
    }

    // Create the subcategory
    const subcategory = new SubCategory({ name, description, categoryId });
    await subcategory.save();

    return res.status(201).json({
      message: "Subcategory added successfully",
      subcategory,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error.message);
    next(error);
  }
};

// Update a subcategory
exports.updateSubcategory = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const { name, description } = req.body;

    // Validate input
    if (!subCategoryId || isNaN(subCategoryId)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    // Find the subcategory
    const subcategory = await SubCategory.findById(subCategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Update fields
    if (name) subcategory.name = name;
    if (description) subcategory.description = description;

    await subcategory.save();

    return res.status(200).json({
      message: "Subcategory updated successfully",
      subcategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error.message);
    next(error);
  }
};

// Delete a subcategory
exports.deleteSubcategory = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;

    // Validate input
    if (!subCategoryId || isNaN(subCategoryId)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    // Find and delete the subcategory
    const subcategory = await SubCategory.findByIdAndDelete(subCategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    return res.status(200).json({
      message: "Subcategory deleted successfully",
      deletedSubcategory: subcategory,
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error.message);
    next(error);
  }
};