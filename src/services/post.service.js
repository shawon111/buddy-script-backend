const Post = require("../models/post.model");

const savePost = async (postData) => {
    const { author, text, image, isPrivate } = postData;
    const newPost = await Post.create({ author, text, image, isPrivate });
    if (!newPost) {
        throw new Error('Failed to create post');
    }
    return newPost;
}

const pullPosts = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const posts = await Post.find({
        $or: [
            { isPrivate: false },
            { author: userId }
        ]
    }).skip(skip).limit(limit);
    return posts;
}

module.exports = {
    savePost,
    pullPosts
};