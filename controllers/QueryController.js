const HttpError = require ('../models/http-error');
const User = require('../models/user');
const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')
const Topic = require('../models/topic')

const getAllPostsOfUser = async(req,res,next) => {
    try{
    const userQuery = {userId : req.params.userId}
    const tempUser = await User.findOne(userQuery).populate('postList')
    tempUser.postList = tempUser.postList || []
    res.status(201).json(tempUser.postList)
    }
    catch (err) {
        return next(new HttpError(err.message, 401));
      }
}

exports.getAllPostsOfUser = getAllPostsOfUser