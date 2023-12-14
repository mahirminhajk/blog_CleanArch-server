export default interface IBlog {
    _id?: string;
    title: string;
    content: string;
    img?: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: string[];
}