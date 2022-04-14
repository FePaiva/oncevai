const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')

dotenv.config();
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(() => {
      console.log("MongonDB Connected")
    })
    .catch(err=> console.log(err));


    app.use("/api/pins", pinRoute)
    app.use("/api/users", userRoute)


app.listen(8800,()=>{
    console.log('Backend server is running again')
})