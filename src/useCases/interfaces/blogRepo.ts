import IBlog from "../../domain/entities/blog";

export default interface BlogRepo{
    createBlog(blog: IBlog): Promise<IBlog>;
    getBlogById(_id: string): Promise<IBlog | null>;
    getBlogByTitle(title: string): Promise<IBlog | null>;
    deleteBlog(_id: string): Promise<unknown>;
    findAllBlogs(): Promise<IBlog[]>;
}