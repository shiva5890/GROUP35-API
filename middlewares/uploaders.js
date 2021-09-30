const path = require('path');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads/images'));
    }
})

function typeFilter(req, file, cb) {
    const fileType = file.mimetype.split('/')[0];  // yo image/jpg or application/pdf jasto kura lai break garxa ani image athawa application lai agadiko vag matra linxa
    // 
    if (fileType === 'image') { // yedi file type image vayo vane matra mathi ko process complete hune
        cb(null, true)
    } else {
        req.fileTypeError = true;
        cb(null, true)
    }
}
// file filter will not block req-res cycle and it will skip the  file upload
const upload = multer({
    storage: fileStorage,
    fileFilter: typeFilter
})

module.exports = upload;
