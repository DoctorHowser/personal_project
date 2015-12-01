var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/PrimeOrigin';

router.post('/', function(req, res) {
    var result = 0;
    var check = req.body;
    pg.connect(connectionString, function(err, client, done){
        if (err) console.log('error connection to database: ', err);
        var query = client.query("SELECT username " +
            "FROM users " +
            "WHERE username = $1;", [check.value]);
        query.on('row', function(row){
            result++;
        });
        query.on('end', function(){
            if (result === 0) {
                res.send({
                    'error': false,
                    'isUnique': true
                });
            } else {
                res.send({
                    'error': false,
                    'isUnique': false
                })
            }

        });
    });



});

router.get("/*", function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;