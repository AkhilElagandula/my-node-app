const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define the schema for the category
const categorySchema = new mongoose.Schema(
  {
    categoryId: { type: Number, unique: true }, // Auto-incremented field
    name: { type: String, required: true, unique: true, trim: true }, // Trim whitespace for better consistency
    description: { type: String, trim: true }, // Trim for cleaner inputs
    createdAt: { type: Date, default: Date.now }, // Use default without calling Date.now()
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Apply auto-increment plugin to categoryId
categorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

module.exports = mongoose.model('Category', categorySchema);