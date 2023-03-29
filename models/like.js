const mongoose = require('mongoose')

let User = require('../models/user')
let Post = require('../models/post')

const LikeSchema = new mongoose.Schema({
    likeId : {
        type: Number,
        unique:true
      },
      likerId : {
        type: Number,
      },
      postId : {
        type : Number,
      },
})

  

const Like = mongoose.model('Like', LikeSchema)
module.exports = Like;