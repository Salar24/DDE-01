const mongoose = require('mongoose')

let User = require('../models/user')
let Topic = require('../models/topic')

const PostSchema = new mongoose.Schema({
    postId : {
        type: Number,
        unique:true
      },
    posterId: {
        type: Number,
        required : true
    },
      //The total no. of students in the class (sections combined)
      topic : {
        type:mongoose.Schema.Types.ObjectId ,ref:'Topic'  
      },
      description : {
        type: String,
        required: true
      },
      likes : {
        type : Number,
        required : true
      },
      comments : [
        {
            type: Number,
            required: true
        }
      ]               
})

PostSchema.pre('save', async function(next) {
    const user = this;
    if (!user.postId) {
      const latestUser = await Post.findOne().sort({ postId: -1 });
      user.postId = latestUser ? latestUser.postId + 1 : 1;
    }
    next();
  });
  

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;