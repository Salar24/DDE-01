const express = require('express')
const app = express()
const HttpError = require('./models/http-error');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://dbuser:1234abcd@cluster0.gz9pknp.mongodb.net/DDE-01?retryWrites=true&w=majority" 
const User = require('./models/user')


mongoose.connect(mongoURL);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



app.use(express.json({limit: '50mb'}));
app.use('/user', userRoutes);

//only runs if we get some request which did not get a response from upper middlewares
app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route', 404);
    throw error;
  });

  
console.log("hello")
app.listen(5000, () => {
    console.log("Server running on port 5000");
})