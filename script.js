const express =require('express');
const port=8000;
const path=require('path');
const app=express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'pages'));
app.use(express.urlencoded());
app.use(express.static('style'));

var success=0;
var login=0;
var id=0;
var login_id=0;

// Requiring Login DB
const db=require('./database/config/mongoose');
const Login=require('./database/models/model');

app.get('/',function(req,res){ 
    return res.render('home');
});
app.get('/details',function(req,res){ 
    console.log(login_id);
    Login.find({id:login_id},function(err,data){
        if(err){
            console.log("Error from Fetching the contacts");
            return;
        }
        console.log(data);
        return res.render('details', { contact_list:data});
    });
});

app.post('/signin',function(req,res){ 
    return res.render('signin',{login:login});
});

app.get('/signin',function(req,res){ 
    return res.render('signin',{login:login});
});
app.post('/signin-validation',function(req,res){ 
    login=0;
    Login.findOne({name:req.body.name},function(err,data){
        if(err){
            console.log("Error from Fetching the contacts");
            return;
        }
        if(data){
            if(data.password==req.body.password){
                login_id=data.id;
                console.log('Correct Password');
                return res.redirect('/details');
                }
                else{
                    login=1;
                    console.log('Incorect Id or Password');
                    return res.redirect('/signin');
                }
            }
            else{
                login=1;
                console.log('Incorect Id or Password');
                return res.redirect('/signin');
            }
        });
    });
app.get('/signup',function(req,res){ 
    return res.render('signUp',{success:success});
 });

app.post('/signup',function(req,res){ 
    return res.render('signup');
});
app.post('/signup-details',function(req,res){ 
    success=0;
    let input_pass=req.body.password;
    let confirm_pass=req.body.confirmpass;
    if(input_pass!=confirm_pass){
        success=1;
        return res.redirect('/signup');
    }
    id++;
    Login.create({
        id:id,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    },function(err,newEmployee){
        if(err) {
            console.log("Error in creating an entry in script.js");
            return;
        }
        return res.redirect('/signin');
    });
 });
app.listen(port,function(error){
    if(error){
        console.log('Error',error); 
        return;
    }
    console.log('The server is running fine on port number ',port);
});
