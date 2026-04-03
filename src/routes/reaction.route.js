const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const reactionController = require("../controllers/reaction.controller");
const { togglePostLike, toggleCommentLike } = reactionController;

// toggle post like
router.post('/post/:postId', authMiddleware, togglePostLike);

// toggle comment like
router.post('/comment/:commentId', authMiddleware, toggleCommentLike);

module.exports = router;
