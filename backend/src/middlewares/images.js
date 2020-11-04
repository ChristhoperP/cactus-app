const { MulterError } = require('multer');
const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');
const configuracion = require('../config');

/* const storageMulter = multer.diskStorage({
    destination: 'src/public/uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
}); */

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 },//15MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(null, false);
    }
});

const { Storage } = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage({
    keyFilename: 'cactus.json'
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET || configuracion.bucketName);


const uploadGoogle = (req, res, next) => {
    if (req.file) {
        // Create a new blob in the bucket and upload the file data.
        req.file.filename = uuid() + path.extname(req.file.originalname).toLocaleLowerCase()
        //console.log(req.file);
        const blob = bucket.file(req.file.filename);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
            next(err);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            /* const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            ); */
            //res.status(200).send(publicUrl);
            next();
        });

        blobStream.end(req.file.buffer);
    } else if (req.files) {
        if (req.files.portada) {
            //console.log(req.files.portada);
            req.files.portada[0].filename = uuid() + path.extname(req.files.portada[0].originalname).toLocaleLowerCase()
            console.log(req.files.portada[0].filename);
            const blob = bucket.file(req.files.portada[0].filename);
            const blobStream = blob.createWriteStream();

            blobStream.on('error', (err) => {
                //next(err);
            });

            blobStream.on('finish', () => {
                //next();
            });

            blobStream.end(req.files.portada[0].buffer);
        }

        if (req.files.gallery) {
            //console.log(req.files.gallery);

            req.files.gallery.forEach(element => {
                element.filename = uuid() + path.extname(element.originalname).toLocaleLowerCase()

                console.log(element.filename);
                const blob = bucket.file(element.filename);
                const blobStream = blob.createWriteStream();

                blobStream.on('error', (err) => {
                    //next(err);
                });

                blobStream.on('finish', () => {
                    //next();
                });

                blobStream.end(element.buffer);
            });
        }

        next();
    } else {
        next();
    }
};



module.exports = { upload, uploadGoogle };