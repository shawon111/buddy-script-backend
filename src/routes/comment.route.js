const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const commentController = require("../controllers/comment.controller");

const { createComment, getComments } = commentController;

// routes
router.post('/', authMiddleware, createComment);
router.get('/', authMiddleware, getComments);

module.exports = router;