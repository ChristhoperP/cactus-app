const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

const storage = multer.diskStorage({
    destination: 'src/public/uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 1048576},
    fileFilter: (req, file, cb)=>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo debe ser una imagen válida.");
        
    }
});



module.exports = { upload };