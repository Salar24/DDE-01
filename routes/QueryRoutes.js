const express = require('express');
const router = express.Router();


const QueryController = require('../controllers/QueryController')

router.get('/getAllPostsByUser', QueryController.getAllPostsOfUser)
router.get('/getTopLikesOfUser', QueryController.getTopLikesOfUser)
router.get('/getTopComments', QueryController.getTopCommentsOfAUser)
router.get('/getAllCommentsByUser/:userId', QueryController.getAllCommentsByUser)
router.get('/getAllPostsOnATopic/:topicId', QueryController.getAllPostsOnATopic)
router.get('/topTopics/:limit', QueryController.topTopics)

module.exports = router
