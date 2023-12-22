const multer = require("multer");
const path = require("path");
const moment = require("moment/moment");
const AppUtil = require("../util/AppUtil");
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let dirname = `images/${moment().format("YYYY/MM/DD")}/${req.user._id}`;
    let dir = await AppUtil.checkPath(dirname);
    req.filePath = dirname;
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
