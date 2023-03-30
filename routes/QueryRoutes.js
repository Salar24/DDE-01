const express = require('express');
const router = express.Router();


const QueryController = require('../controllers/QueryController')

router.get('/getAllPostsByUser/:userId', QueryController.getAllPostsOfUser)

module.exports = router

