const Comment = require("../models/comment.model");

const saveComment = async (commentData) => {
    const { author, post, text, parent } = commentData;
    const query = { author, post, text };
    if (parent) {
        query.parent = parent;
    }
    const newComment = await Comment.create(query);
    if (!newComment) {
        throw new Error('Failed to create comment');
    }
    return newComment;
}

const pullComments = async (postId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const comments = await Comment.find({ post: postId }).populate('author', 'firstName lastName').skip(skip).limit(limit).sort({ createdAt: -1 });

    const maincomments = comments.filter(comment => !comment.parent);
    const replies = comments.filter(comment => comment.parent);

    replies.forEach(reply => {
        const parentComment = maincomments.find(comment => comment._id.toString() === reply.parent.toString());
        if (parentComment) {
            if (!parentComment.replies) {
                parentComment.replies = [];
            }
            parentComment.replies.push(reply);
        }
    });

    return maincomments;
}

module.exports = {
    saveComment,
    pullComments
};