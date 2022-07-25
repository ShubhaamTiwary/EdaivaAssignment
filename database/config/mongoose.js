// COnnecting with DB
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/employee');

const db=mongoose.connection;

db.on('error', console.error.bind(console,'error connection DB'));

db.once('open',function(){
    console.log('Succesfully Connected to Logins DB')
});

