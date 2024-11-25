const fs = require("fs");
const mammoth = require("mammoth");

exports.extractWordsFromDocx = async (filePath) => {
  const docxContent = fs.readFileSync(filePath);
  const { value: text } = await mammoth.extractRawText({ buffer: docxContent });
  return text.split(/\s+/);
};
