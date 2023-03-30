const express = require('express')
const app = express()
const HttpError = require('./models/http-error');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const masterRoutes = require('./routes/masterRoutes')
const mongoose = require('mongoose')
const mongoURL = "mongodb://127.0.0.1:27017/DDE-01" 
const User = require('./models/user')
const queryRoutes = require('./routes/QueryRoutes')


mongoose.connect(mongoURL);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



app.use(express.json({limit: '50mb'}));
app.use('/user', userRoutes);
app.use('/master', masterRoutes )
app.use('/query', queryRoutes)

//only runs if we get some request which did not get a response from upper middlewares
app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route', 404);
    throw error;
  });

  
console.log("hello")
app.listen(5000, () => {
    console.log("Server running on port 5000");
})