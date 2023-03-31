const HttpError = require ('../models/http-error');
const User = require('../models/user');
const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')
const Topic = require('../models/topic')
const { faker } = require('@faker-js/faker');

function addingUsers(userSize) {
    console.log("Generating 50 Users")
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

function addingFriends(users)
{
    for(let i = 0; i < users.length; i++)
    {
        //generate the number of friend
        const floatRandom = Math.random()
        var random1 = Math.round(10 * floatRandom) -1
        if(random1 < 0)
        {
            random1 = 0
        }
        let loopCount = 0
        let checkList = []
        while(loopCount < random1)
        {
            const floatRandom = Math.random()
            var random1 = Math.round(users.length * floatRandom) -1
            if(random1 < 0)
            {
                random1 = 0
            }
            if(random1 == users[i].userId)
            {
                loopCount = loopCount + 1
            }
            else 
            {
                if(checkList.includes(random1))
                {
                    loopcount = loopCount + 1
                }
                else
                {
                users[i].friendList = users[i].friendList || []
                users[i].friendList.push(random1)
                loopCount = loopCount + 1
                }
            }
        }

    }
    for(let i=0;i<users.length;i++)
    {
        users[i].save()
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
    for(let i=0; i< 300; i++)
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

        const postId = k
        const description = faker.lorem.paragraph()
        const posterId = userList[random1].userId
        const topic = topicList[random2].topicId

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

function addingLikesAndComments(users, posts) 
{
    var k = 0
    var likeId = 0
    var commentId = 0
    for(let i=0;i<posts.length;i++)
    {
        const floatRandom = Math.random()
        var random1 = Math.round(5 * floatRandom)
        var random2 = Math.round(10 * floatRandom)
        let loopCount = 0;
        while(loopCount < random1)
        {
            console.log(likeId)
            const postId = posts[i].postId
            const likerId = Math.round(users.length * floatRandom) -1
            const newLike = new Like({
                postId, likerId, likeId
            })
            likeId = likeId + 1
            newLike.save()
            console.log("After creating like")
            posts[i].likeList = posts[i].likeList || []
            posts[i].likeList.push(newLike)
            loopCount = loopCount + 1
        }
        let loopCount2 = 0
        while(loopCount2 < random2)
        {
            console.log(commentId)
            const postId = posts[i]._id
            const commenterId = users[Math.round(users.length * floatRandom) -1].userId
            const commentDescription = faker.lorem.sentence()
            const newComment = new Comment({
                commenterId, commentDescription, commentId, postId
            })
            commentId = commentId  + 1
            newComment.save()
            console.log("After creating comment")
            posts[i].comments = posts[i].comments || []
            posts[i].comments.push(commentId)
            loopCount2 = loopCount2 + 1
        }
    }
    for(let i=0;i<posts.length;i++)
    {
        posts[i].save()
    }
    
}

const addRandomData = async(req, res, next) => {
    try {
        const userSize = 50
        const topicSize = 10
        addingUsers(userSize)
        addingTopics(topicSize)
        const topicList = await Topic.find()
        const userList = await User.find()
        
        addingPosts(userList, topicList)
        const userListNew = await User.find().populate('postList')
        const postList = await Post.find()
        addingLikesAndComments(userListNew, postList)
        const userListFinal = await User.find()
        addingFriends(userListFinal)
         res.status(201).json(1)
         console.log("After status")
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
    const likes = await Like.deleteMany({})
    const comments = await Comment.deleteMany({})
    res.status(201).json(1)
    return
}

exports.deleteData = deleteData
exports.addRandomData = addRandomData