import { Schema, Document, Model, model, Types } from 'mongoose';
import IBlog from '../../domain/entities/blog';

const blogSchema: Schema = new Schema<IBlog & Document>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
    author: { type: Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const BlogModel: Model<IBlog & Document> = model<IBlog & Document>("Blog", blogSchema);

export default BlogModel;