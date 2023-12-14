import { Router } from 'express';
import BlogController from '../../adapter/controllers/blogController';
import BlogUseCase from '../../useCases/blogUseCase';
import BlogRepository from '../repositories/blogRepository';
import MulterImgUploader from '../services/multerImgUploader';

const blogRepository = new BlogRepository();
const imgUploader = new MulterImgUploader();

const blogUseCase = new BlogUseCase(blogRepository, imgUploader);

const controller = new BlogController(blogUseCase);

const router = Router();

router.post("/", imgUploader.upload.single("img"), (req, res, next) => controller.getName(req, res, next));

export default router;