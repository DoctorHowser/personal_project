/**
 * Created by danesmith on 11/23/15.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

//router.get('/', function (req, res, next){
//    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
//});

router.post('/', function(req,res,next){
    console.log('posted!');
    res.send('Got it!');
});

module.exports = router;