import { Schema, Document, Model, model } from 'mongoose';
import IBlog from '../../domain/entities/blog';

const blogSchema:Schema = new Schema<IBlog & Document>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: {type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{timestamps: true});

const BlogModel: Model<IBlog & Document> = model<IBlog & Document>("Blog", blogSchema);

export default BlogModel;