const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const subCategorySchema = new mongoose.Schema({
  subCategoryId: { type: Number }, // Auto-incremented field
  name: { type: String, required: true },
  description: { type: String },
  categoryId: { type: Number, required: true }, // Maps to MasterCategory or SubCategory
  createdAt: { type: Date, default: Date.now },
});

// Apply auto-increment plugin to subCategoryId
subCategorySchema.plugin(AutoIncrement, { inc_field: 'subCategoryId' });

module.exports = mongoose.model('SubCategory', subCategorySchema);
