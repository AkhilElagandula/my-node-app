const pdfParse = require('pdf-parse');  // To parse PDF content
const mammoth = require('mammoth');     // For creating DOCX from text
const fs = require('fs');

// Function to extract text from PDF and convert to DOCX
exports.convertPdfToDocx = async (pdfPath) => {
  // Step 1: Extract text from the PDF
  const pdfData = fs.readFileSync(pdfPath);
  const pdfText = await pdfParse(pdfData).then(data => data.text);

  // Step 2: Create DOCX using Mammoth
  const docxPath = pdfPath.replace(".pdf", ".docx");

  // Convert the extracted text into a DOCX file
  try {
    const result = await mammoth.convertToHtml({ html: pdfText });
    
    // Write the converted content to a .docx file
    fs.writeFileSync(docxPath, result.value);
    console.log(`DOCX file saved at ${docxPath}`);
    return docxPath;
  } catch (error) {
    console.error('Error during conversion:', error);
    throw new Error('Conversion failed');
  }
};
