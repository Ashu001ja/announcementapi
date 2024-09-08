const mongoose = require('mongoose');
// const cnn=require('../db/database');
const dataSechema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    date:{
        type:String
    }
});

module.exports=mongoose.model('Data',dataSechema);