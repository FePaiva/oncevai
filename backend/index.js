const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(() => {
      console.log("MongonDB Connected")
    })
    .catch(err=> console.log(err));


app.listen(8800,()=>{
    console.log('Backend server is running again')
})