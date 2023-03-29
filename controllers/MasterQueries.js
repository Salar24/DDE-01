const HttpError = require ('../models/http-error');
const User = require('../models/user');
const Post = require('../models/post')
const Comment = require('../models/comment')
const Topic = require('../models/topic')
const { faker } = require('@faker-js/faker');

function addingUsers(userSize) {
    console.log("Generating 15 Users")
    var k = 1
    for(let i =0; i < userSize; i++)
    {
        const username = faker.name.fullName(); // Rowan Nikolaus
        const email = faker.internet.email(); // Kassandra.Haley@erich.biz
        const password = faker.internet.password()

        const userId = k
        const newUser = new User({
            userId, username, email, password
          });  
        newUser.save()
        k = k +1
    }
}

function addingTopics(topicSize) {
    var k = 1
    for(let i = 0; i < topicSize; i++)
    {
        const topicId = k
        const topicDescription = faker.vehicle.manufacturer()
        const newTopic = new Topic({
            topicId, topicDescription
        })
        newTopic.save()
        k = k+1
    }
}

function addingPosts(userList, topicList) {
    //Sample Loop
    console.log("In Adding Posts")
    var k = 1
    for(let i=0; i< 50; i++)
    {
        const floatRandom = Math.random()


  // random between 0 and the difference
        var random1 = Math.round(userList.length * floatRandom) -1
        var random2 = Math.round(topicList.length * floatRandom) -1
        if(random1 == -1)
        {
            random1 = 0
        }
        if(random2 == -1)
        {
            random2 = 0
        }

        console.log(random1)
        console.log(random2)
        console.log(userList[random1].userId)
        console.log(topicList[random2]._id)
        const postId = k
        const description = faker.lorem.paragraph()
        const posterId = userList[random1].userId
        const topic = topicList[random2]._id

        const likes = 0
        const newPost = new Post({
        postId, description, posterId, topic,likes
        })
        newPost.save()
        topicList[random2].postsIds = topicList[random2].postsIds || []
        topicList[random2].postsIds.push(postId)
        
        userList[random1].postList = userList[random1].postList || []
        userList[random1].postList.push(newPost._id)
    


        k = k +1

    }
    for(let i=0;i<userList.length; i++)
    {
        userList[i].save()
    }
    for(let i=0;i<topicList.length;i++)
    {
        topicList[i].save()
    }
}
const addRandomData = async(req, res, next) => {
    try {
        const userSize = 20
        const topicSize = 5
        addingUsers(userSize)
        addingTopics(topicSize)
        const topicList = await Topic.find()
        const userList = await User.find()
        
        addingPosts(userList, topicList)
        
         res.status(201).json(1)
         return
      }
      catch (err) {
        return next(new HttpError(err.message, 401));
      }
}

const deleteData = async(req,res,next) => {
    console.log("Deleted A lot")
    const users = await User.deleteMany({})
    const topics = await Topic.deleteMany({})
    const posts = await Post.deleteMany({})
    res.status(201).json(1)
    return
}

exports.deleteData = deleteData
exports.addRandomData = addRandomData