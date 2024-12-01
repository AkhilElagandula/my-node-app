const express = require("express");
const { uploadFile } = require("../controllers/recordController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
