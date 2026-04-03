const { pullComments, saveComment } = require("../services/comment.service");
const catchAsync = require("../utils/catchAsync");
const responseFn = require("../utils/responseFn");

// create comment
const createComment = catchAsync(async (req, res) => {
    const { post, text, parent } = req.body;
    const query = { post, text };
    if (parent) {
        query.parent = parent;
    }
    const author = req.user;
    const newComment = await saveComment({ ...query, author });
    responseFn(res, 201, true, newComment, "Comment created successfully");
});

// get comments
const getComments = catchAsync(async (req, res) => {
    const { postId } = req.body;
    const { page, limit } = req.query;
    const comments = await pullComments(postId, page, limit);
    responseFn(res, 200, true, comments, "Comments retrieved successfully");
});

module.exports = {
    createComment,
    getComments
}