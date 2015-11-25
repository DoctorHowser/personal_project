var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.get('/instructor', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/registerinstructor.html'));
});

router.post('/', function(req,res,next){
    var student = req.body;
    student.role ='student';
    Users.create(req.body, function(err,post){
        if(err){
            next(err);
        } else {
            res.redirect('/');
        }
    }) ;
});

router.post('/instructor', function(req,res,next){
    var instructor = req.body;
    instructor.role ='instructor';
    Users.create(req.body, function(err,post){
        if(err){
            next(err);
        } else {
            res.redirect('/');
        }
    }) ;
});

module.exports = router;