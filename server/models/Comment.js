const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;