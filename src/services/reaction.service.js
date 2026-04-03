const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

// toggle post reaction
const togglePostReaction = async (postId, userId) => {
    const updateReaction = await Post.findByIdAndUpdate(
        { _id: postId },
        [
            {
                $set: {
                    likes: {
                        $cond: {
                            if: { $in: [userId, "$likes"] },
                            then: { $setDifference: ["$likes", [userId]] },
                            else: { $concatArrays: ["$likes", [userId]] }
                        }
                    }
                }
            }
        ],
        { returnDocument: 'after', updatePipeline: true }
    );
    if (!updateReaction) {
        throw new Error('Failed to toggle reaction');
    }
    return updateReaction;
}

// toggle comment reaction
const toggleCommentReaction = async (commentId, userId) => {
    const updateReaction = await Comment.findOneAndUpdate(
        { _id: commentId },
        [
            {
                $set: {
                    likes: {
                        $cond: {
                            if: { $in: [userId, "$likes"] },
                            then: { $setDifference: ["$likes", [userId]] },
                            else: { $concatArrays: ["$likes", [userId]] }
                        }
                    }
                }
            }
        ],
        { new: true, updatePipeline: true }
    );
    if (!updateReaction) {
        throw new Error('Failed to toggle reaction');
    }
    return updateReaction;
}

module.exports = {
    togglePostReaction,
    toggleCommentReaction
};