import IBlog from "../../domain/entities/blog";
import BlogModel from "../database/blogModel";
import BlogRepo from "../../useCases/interfaces/blogRepo";

class BlogRepository implements BlogRepo{

    async createBlog(blog: IBlog): Promise<IBlog> {
        const newBlog = new BlogModel(blog);
        return await newBlog.save();
    }

    async getBlogById(_id: string): Promise<IBlog | null> {
        return await BlogModel.findById(_id);
    }

    async getBlogByTitle(title: string): Promise<IBlog | null> {
        return await BlogModel.findOne({title});
    }

    async deleteBlog(_id: string): Promise<unknown> {
        return await BlogModel.findByIdAndDelete(_id);
    }

    async findAllBlogs(): Promise<IBlog[]> {
        return await BlogModel.find();
    }
}