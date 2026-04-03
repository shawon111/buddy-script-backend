const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");

const { createPost, getPosts } = postController;
// routes
router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);

module.exports = router;