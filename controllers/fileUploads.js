const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const uploads = multer({ storage: fileStorage });
module.exports = { uploads };
