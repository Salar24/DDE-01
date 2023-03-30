const mongoose = require('mongoose')

let User = require('../models/user')
let Post = require('../models/post')

const CommentSchema = new mongoose.Schema({
    commentId : {
        type: Number,
        unique:true
      },
      //The total no. of students in the class (sections combined)
      commentDescription : {
        type: String,
        required: true
      },
      commenterId: 
      {
      type:mongoose.Schema.Types.ObjectId ,ref:'User'  
      },
      postId:
      {
        type:mongoose.Schema.Types.ObjectId, ref:'Post'
      }
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment;