const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    postText: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
});

const Post = model('Post', postSchema);

module.exports = Post;