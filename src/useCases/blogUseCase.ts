//* entites
import IBlog from "../domain/entities/blog";
//* repositories
import BlogRepository from "../infrastructure/repositories/blogRepository";
import CustomError from "../infrastructure/services/customError";
import IImgUploader from "./interfaces/IImgUploader";
//* services

class BlogUseCase {

  private blogRepository: BlogRepository;
  private imgUploader: IImgUploader;

  constructor(blogRepository: BlogRepository, imgUploader: IImgUploader) {
    this.blogRepository = blogRepository;
    this.imgUploader = imgUploader;
  }

  async getName(img: Express.Multer.File): Promise<string> {

    console.log("img"); //TODO: remove


    return await this.imgUploader.getuploadImgName(img);
  }

  validateAndCreateBlog(blog: IBlog, image?: Express.Multer.File): Promise<IBlog | CustomError> {
    return new Promise((resolve, reject) => {
      return resolve(blog);
    });

  }
}

export default BlogUseCase;
