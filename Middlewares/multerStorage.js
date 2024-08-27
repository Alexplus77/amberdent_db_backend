const multer = require("multer");
const path = require("path");

// Сохраняем файл csv в папку uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.uploads = multer({ storage: storage });
