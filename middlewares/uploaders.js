const path = require('path');
const multer = require('multer');
// const upload = multer({
//     dest: path.join(process.cwd(), 'uploads')
// })

const fileStorage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads/images'));
    }
})

function typeFilter(req, file, cb) {
    const fileType = file.mimetype.split('/')[0];
    if (fileType === 'image') {
        cb(null, true)
    } else {
        req.fileTypeError = true;
        cb(null, false)
    }
}
// file filter will not block req-res cycle and it will skip the  file upload
const upload = multer({
    storage: fileStorage,
    fileFilter: typeFilter
})

module.exports = upload;
