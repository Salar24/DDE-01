const mongoose = require('mongoose')
let Post = require('../models/post')

const UserSchema = new mongoose.Schema({
    userId : {
        type: Number,
        unique:true
      },
      //The total no. of students in the class (sections combined)
      username : {
        type: String,
        required: true
      },
      password : {
        type: String,
        required: true
      },
      email : {
        type : String,
        required : true
      },
      friendList: 
      [{
        type: Number,

      }],
      postList:
      [{
        type:mongoose.Schema.Types.ObjectId ,ref:'Post'  
      }]
})

UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.userId) {
      const latestUser = await User.findOne().sort({ userId: -1 });
      user.userId = latestUser ? latestUser.userId + 1 : 1;
    }
    next();
  });
  

const User = mongoose.model('User', UserSchema)
module.exports = User;