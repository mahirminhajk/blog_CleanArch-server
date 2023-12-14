import IImgUploader from "../../useCases/interfaces/IImgUploader";
import multer from "multer";
import path from "path";

export default class MulterImgUploader implements IImgUploader {

    private storage: multer.StorageEngine;
    public upload: multer.Multer;

    constructor(directory: string = 'public/uploads') {
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '../../infrastructure/', directory));
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            },
        });

        this.upload = multer({ storage: this.storage });
    }

    getuploadImgName(img: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            if (img) {
                return resolve(img.filename);
            }
            return reject("No image provided");
        });
    }
};
