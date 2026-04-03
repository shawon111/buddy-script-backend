const { togglePostReaction, toggleCommentReaction } = require("../services/reaction.service");
const catchAsync = require("../utils/catchAsync");
const responseFn = require("../utils/responseFn");

// toggle post like
const togglePostLike = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user;

    const updateLike = await togglePostReaction(postId, userId);
    responseFn(res, 201, true, updateLike, 'Post reaction toggled successfully');
});

// toggle comment like
const toggleCommentLike = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user;
    const updateLike = await toggleCommentReaction(commentId, userId);
    responseFn(res, 201, true, updateLike, 'Comment reaction toggled successfully');
});

module.exports = {
    togglePostLike,
    toggleCommentLike
}