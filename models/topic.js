const mongoose = require('mongoose')


const TopicSchema = new mongoose.Schema({
    topicId : {
        type: Number,
        unique:true
      },
      postsIds : [
        {
            type: Number,
        }
      ],
      topicDescription : {
        type: String,
        required:true
      }
        
            
        
      
})

TopicSchema.pre('save', async function(next) {
    const user = this;
    if (!user.topicId) {
      const latestUser = await Topic.findOne().sort({ topicId: -1 });
      user.topicId = latestUser ? latestUser.topicId + 1 : 1;
    }
    next();
  });
  

const Topic = mongoose.model('Topic', TopicSchema)
module.exports = Topic;