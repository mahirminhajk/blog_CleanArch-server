import { Request, Response, NextFunction } from 'express';
//*usecase
import BlogUseCase from '../../useCases/blogUseCase';

class BlogController {
  private blogUseCase: BlogUseCase;

  constructor(blogUseCase: BlogUseCase) {
    this.blogUseCase = blogUseCase;
  }

  async getName(req: Request, res: Response, next: NextFunction) {
    try {

      if (!req.file) throw new Error("No image provided");

      const name = await this.blogUseCase.getName(req.file);
      res.send(name);
    } catch (error) {
      next(error);
    }
  }

  // async getBlogs(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     this.blogUseCase.validateAndCreateBlog("Hello");
  //     res.send("Hello World");
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default BlogController;