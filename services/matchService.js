const fs = require("fs");
const mammoth = require("mammoth");
const Reference = require("../models/Reference");

// Match words from DOCX to reference words in the DB
exports.matchWords = async (docxPath) => {
  const docxContent = fs.readFileSync(docxPath);
  const { value: text } = await mammoth.extractRawText({ buffer: docxContent });
  
  const referenceWords = await Reference.find({});
  const matchedWords = referenceWords.filter((word) => text.includes(word.word));
  
  return matchedWords;
};
