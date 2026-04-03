const { savePost, pullPosts } = require("../services/post.service");
const catchAsync = require("../utils/catchAsync");
const responseFn = require("../utils/responseFn");

const createPost = catchAsync(async (req, res) => {
    const postData = req.body;
    const author = req.user

    const newPost = await savePost({ ...postData, author });
    responseFn(res, 201, true, newPost, "Post created successfully");
})

const getPosts = catchAsync(async (req, res) => {
    const userId = req.user;
    const { page, limit } = req.query;
    const posts = await pullPosts(userId, page, limit);
    responseFn(res, 200, true, posts, "Posts retrieved successfully");
})

module.exports = {
    createPost,
    getPosts
}