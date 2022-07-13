const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    const match = [  
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword"   
  ];
    if (match.indexOf(file.mimetype) === -1) {      
      var message = `${file.originalname} is invalid. Only accept pdf,doc,docx`;
      return cb(message, null);
    }
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})
.single("file")  

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

// const util = require("util");
// const path = require("path");
// const multer = require("multer");
// const maxSize = 2 * 1024 * 1024;
// var storage = multer.diskStorage({
//    destination: (req, file, callback) => {  
//     callback(null, path.join(`${__dirname}/../../upload`));
//   },
//   filename: (req, file, callback) => {
//     const match = ["image/png", "image/jpeg"];
//     if (match.indexOf(file.mimetype) === -1) {
//       var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
//       return callback(message, null);
//     }
//     var filename = `${Date.now()}-bezkoder-${file.originalname}`;  
//     callback(null, filename);
//   }
// });
// var uploadFiles = multer({ 
//   storage: storage
// }).array("multifiles", 5);
// var uploadFilesMiddleware = util.promisify(uploadFiles);
// module.exports = uploadFilesMiddleware;
