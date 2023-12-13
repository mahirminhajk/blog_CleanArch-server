import {Request, Response, NextFunction} from 'express';
//*usecase
import BlogUseCase from '../../useCases/blogUseCase';

class BlogController {
  private blogUseCase: BlogUseCase;

  constructor(blogUseCase: BlogUseCase) {
    this.blogUseCase = blogUseCase;    
  }

  

  async getBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      this.blogUseCase.validateAndCreateBlog("Hello");
      res.send("Hello World");
    } catch (error) {
      next(error);
    }
  }
}

export default BlogController;