const HttpError = require ('../models/http-error');
const User = require('../models/user');
const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')
const Topic = require('../models/topic')
const http = require('http');
const url = require('url');

const getAllPostsOfUser = async(req,res,next) => {
    try{
    const queryObject = url.parse(req.url, true).query;
    const userQuery = {userId : queryObject.userId}
    const tempUser = await User.findOne(userQuery).populate('postList')
    tempUser.postList = tempUser.postList || []
    res.status(201).json(tempUser.postList)
    }
    catch (err) {
        return next(new HttpError(err.message, 401));
      }
}

const getTopLikesOfUser = async(req,res,next) => {
  try{
    const queryObject = url.parse(req.url, true).query;
    const userQuery = {posterId : queryObject.userId}
    const likeLimit = queryObject.likes
    const postsList = await Post.find(userQuery).populate('likeList')
  
    postsList.sort((a, b) => b.likeList.length - a.likeList.length);
    newList = []
    for(let i=0;i<likeLimit;i++)
    {
      console.log("In loop")
      newList.push(postsList[i])
    }
    res.status(201).json(newList)
  }
  catch (err) {
    return next(new HttpError(err.message, 401));
  }

}

const getTopCommentsOfAUser = async(req,res,next) => {
  try{
    const queryObject = url.parse(req.url, true).query;
    const userQuery = {posterId : queryObject.userId}
    const likeLimit = queryObject.likes
    const postsList = await Post.find(userQuery).populate('likeList')
  
    postsList.sort((a, b) => b.comments.length- a.comments.length);
    newList = []
    for(let i=0;i<likeLimit;i++)
    {
      console.log("In loop")
      newList.push(postsList[i])
    }
    const masterList = []
    for(let k=0;k<newList.length;k++)
    {
      const postsWithComments = {
        description : newList[k].description,
        comments : []
      }
      for(let i=0;i<newList[k].comments.length;i++)
      {
        const tempComment = await Comment.findOne({commentId : newList[k].comments[i]})
        postsWithComments.comments.push(tempComment)
      }
      masterList.push(postsWithComments)
    }
    res.status(201).json(masterList)
  }
  catch (err) {
    return next(new HttpError(err.message, 401));
  }

}

exports.getTopCommentsOfAUser = getTopCommentsOfAUser
exports.getTopLikesOfUser = getTopLikesOfUser
exports.getAllPostsOfUser = getAllPostsOfUser