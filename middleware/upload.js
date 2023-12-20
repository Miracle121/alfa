const util = require("util");
const multer = require("multer");
const path = require("path");
const moment = require("moment/moment");
const AppUtil = require("../util/AppUtil");
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let dirname = `images/${moment().format("YYYY/MM/DD")}/${req.userId}`;
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

const upload = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const whiteList = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "xlsx",
  ];
  // Check ext
  // Check mime
  const mimetype = whiteList.includes(file.mimetype);
  // console.log(mimetype);
  if (mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = upload;
