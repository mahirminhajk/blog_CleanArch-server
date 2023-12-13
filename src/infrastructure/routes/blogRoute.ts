import {Router} from 'express';
import BlogController from '../../adapter/controllers/blogController';
import BlogUseCase from '../../useCases/blogUseCase';


const blogUseCase = new BlogUseCase();

const controller = new BlogController(blogUseCase); 

const router = Router();

router.get("/", (req, res, next) => controller.getBlogs(req, res, next));

export default router;