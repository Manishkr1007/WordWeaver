// models/postModel.js
import  mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: false,
        unique: true,
    },
    content: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    featuredImage: {
        type: String, // Store the URL or path to the image
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;