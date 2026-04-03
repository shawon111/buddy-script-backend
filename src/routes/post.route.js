const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");

const { createPost, getPosts } = postController;
// routes
router.get('/', authMiddleware, getPosts);
router.post('/', authMiddleware, createPost);

module.exports = router;