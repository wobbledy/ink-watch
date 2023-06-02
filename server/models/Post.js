const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
    postText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
        trim: true,
    },
    image: {
        type: String,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
              },
              commentAuthor: {
                type: String,
                required: true,
              },
              createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
              },
        },
    ],
});

const Post = model('Post', postSchema);

module.exports = Post;