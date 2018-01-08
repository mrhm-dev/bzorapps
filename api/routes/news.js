const express = require('express');
const router = express.Router();

const newsController = require('../controllers/news/news');
const voteController = require('../controllers/news/vote');
const commentController = require('../controllers/news/comment');



// Get Method for News /api/news
router.get('/', newsController.getAllNews);

// Post Method for news /api/news
router.post('/', newsController.postANews);

// Get Method for Individual News /api/news/newsId
router.get('/:newsId', newsController.getANews);

// Update Method for News /api/news/newsId
router.put('/:newsId', newsController.updateNews);

// Delete Method for News /api/news/newsId
router.delete('/:newsId', newsController.deleteNews);

// Upvote Method for News /api/news/newsId/upvote
router.put('/:newsId/upvote', voteController.upvote);

// Downvote Method for News /api/news/newsId/downvote
router.put('/:newsId/downvote', voteController.downvote);

// Comment Method for News /api/news/newsId/comment
router.put('/:newsId/comments', commentController.putComment);

// Get All Comment From a News /api/news/newsId/comments
router.get('/:newsId/comments', commentController.getAllComment);

// Update a Comment of a Particular News with CommentId /api/news/newsId/comments/commentId
router.put('/:newsId/comments/:commentId', commentController.updateAComment);

// Delete a Comment of Particula News with CommentId /api/news/newsId/comments/commentId
router.delete('/:newsId/comments/:commentId', commentController.deleteAComment);

module.exports = router;