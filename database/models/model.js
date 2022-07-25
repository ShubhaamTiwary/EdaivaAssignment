// Defining Schema for the database
const mongoose =require('mongoose');

const Data=new mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required: true
    }
});

const Logins=mongoose.model('Logins',Data);
module.exports=Logins;