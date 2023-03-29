const HttpError = require ('../models/http-error');
const User = require('../models/user');

const addUser = async(req, res, next) => {
    console.log(req.body.email)
    const username = req.body.username
    const userId = req.body.userId
    const email = req.body.email
    const password = req.body.password
    const newUser = new User({

        userId, username, email, password
      });
  
  
      newUser
        .save()
        .then(() => res.status(201).json({newUser}))
        .catch((err) => res.status(401).json("Error: " + err));
}

const getUser = async(req, res, next) => {
    try {
        const query = { userId: req.params.userId };
        User.findOne(query)
          .then((user) => res.status(201).json(user))
          .catch((err) => res.status(401).json("Error: " + err));
      }
      catch (err) {
        return next(new HttpError(err.message, 401));
      }
}

const getAll = async(req,res,next) => {
  try {
    User.find()
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(401).json("Error: " + err));
  }
  catch (err) {
    return next(new HttpError(err.message, 401));
  }
}
exports.addUser = addUser
exports.getUser = getUser
exports.getAll = getAll