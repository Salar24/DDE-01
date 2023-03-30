const express = require('express');
const router = express.Router();


const QueryController = require('../controllers/QueryController')

router.get('/getAllPostsByUser', QueryController.getAllPostsOfUser)
router.get('/getTopLikesOfUser', QueryController.getTopLikesOfUser)
router.get('/getTopComments', QueryController.getTopCommentsOfAUser)
module.exports = router
