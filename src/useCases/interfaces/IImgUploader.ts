export default interface IImgUploader {
    getuploadImgName(img: Express.Multer.File): Promise<string>;
};