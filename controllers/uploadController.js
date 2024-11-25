const { convertPdfToDocx } = require("../services/fileService");
const { matchWords } = require("../services/matchService");
const Record = require("../models/Record");

// File upload and conversion
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const docxPath = await convertPdfToDocx(file.path);
    const matchedWords = await matchWords(docxPath);

    // Save matched words to DB
    const record = await Record.create({ fileId: file.filename, matchedWords });
    
    res.status(200).json({ message: "File processed successfully", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
