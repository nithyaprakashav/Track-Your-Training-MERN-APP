require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express();

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})

//Routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

//connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('Connected to MongoDb successfully')
        //listening for requests
        app.listen(process.env.PORT , () => {
        console.log(`Server running on port ${process.env.PORT} successfully`)
        })
    })
    .catch((err)=>{console.log(err)})

