var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post('/',
        passport.authenticate('local', {
            failureRedirect: '/views/failure.html'
        }),
        function(req, res) {
            if (req.user.role === 'student') {
               res.redirect('/views/student.html');
            } else if (req.user.role === 'instructor') {
                res.redirect('/views/instructor.html');
            } else if (!req.user.role) {
                console.log('user has no role, assuming student');
                res.redirect('/views/student.html')
            }
        });

router.get("/*", function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;