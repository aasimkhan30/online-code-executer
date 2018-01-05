var express = require('express');
var router = express.Router();
var db = require('../services/DBservice').db;
var session = require('express-session');
var fileservices = require('../services/FileServices');
/* GET home page. */
router.get('/', function(req, res, next) {
    sess = req.session;
    //console.log(sess);
    if(sess.username){
        res.redirect("/home");
    }
    else{
        res.render('index',{title: 'SPIT Judge'})
    }
});

router.get('/registerpage',function (req,res,next) {
    sess = req.session;
   // console.log(sess);
    if(sess.username){
        res.redirect("/home");
    }
    else{
        res.render('register',{title: 'SPIT Judge'})
    }
});


router.get('/home',function (req,res,next) {
    sess = req.session;
    console.log(sess);
    if(sess.username != null){
        res.render("home",{title:'SPIT Judge',username:sess.username});
    }
    else{
        res.render('index',{title: 'SPIT Judge'});
    }
});

router.post('/login',function (req,res,next) {
    username = req.body.username;
    password = req.body.password;
    //console.log(req.session);
    var userc = db.get('users');
    userc.findOne({"username":username , "password" : password},function (err,docs) {
        if(docs != null){
            res.redirect('/');
            req.session.username = username;
            req.session.save();
        }
        else{
            res.redirect('/');
        }
    });
});

router.post('/register',function (req,res,next) {
    username = req.body.username;
    password = req.body.password;
    //console.log(req.session);
    var userc = db.get('users');
    userc.insert({"username":username , "password" : password},function (err,docs) {
            res.redirect('/');
            fileservices.makerootdir(username);
    });
});

router.get('/quickrun',function (req,res,next) {
    //console.log(req.session);
    sess = req.session;
    console.log(sess);
    if(sess.username != null){
        res.render('code_edit',{title:'SPIT Judge',username:sess.username});
    }
    else{
        res.render('index',{title: 'SPIT Judge'});
    }
});

router.get('/logout',function (req,res,next) {
    //console.log(req.session);
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
