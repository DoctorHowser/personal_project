var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Model = require('../models/models');
var bcrypt = require('bcrypt');

router.get('/', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});



router.post('/', function(req,res,next) {
    var student = req.body;

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(student.password, salt);

    var newUser = {
        username: student.username,
        cohort: student.cohort,
        firstname: student.firstName,
        lastname: student.lastName,
        email: student.email,
        role: 'student',
        salt: salt,
        password: hashedPassword
    };

            Model.User.create(newUser).then(function () {
                res.redirect('/')
            }).catch(function (error) {
                req.flash('error', "Please, choose a different username.")
                res.redirect('/register')
            });

        });

router.get('/instructor', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/registerinstructor.html'));
});

router.post('/instructor', function(req,res,next){
    var instructor = req.body;

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(instructor.password, salt);

    var newUser = {
        username: instructor.username,
        firstname: instructor.firstName,
        lastname: instructor.lastName,
        email: instructor.email,
        role: 'instructor',
        salt: salt,
        password: hashedPassword
    };

    Model.User.create(newUser).then(function () {
        res.redirect('/')
    }).catch(function (error) {
        req.flash('error', "Please, choose a different username.")
        res.redirect('/register')
    });

});

module.exports = router;