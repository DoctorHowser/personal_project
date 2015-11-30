var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/PrimeOrigin';

router.route('/')
    .get(function(req,res){
        pg.connect(connectionString, function(err, client, done){
                var results = [];
                var query = client.query("SELECT users.firstname, users_assignments_junction.*, assignments.* " +
                "FROM users " +
                "JOIN users_assignments_junction " +
                "ON (users.id = users_assignments_junction.user_id) " +
                "JOIN assignments " +
                "ON (assignments.id = users_assignments_junction.assignment_id) " +
                "WHERE users_assignments_junction.status_code = 1;");

                query.on('row', function(row){
                    results.push(row);
                });
                query.on('end', function(){
                    client.end();
                    return res.json(results);
                });
                if (err) {
                    console.log(err);
                }
            })
    })
    .post(function(req, res){
        console.log(req.body);
        res.send('reached queue post route');
        //UPDATE users_assignments_junction
        //SET github = 'link', heroku = 'link', status_code = 1, students_comments = 'This is a comment', update_time = 'now'
        //WHERE user_id = 1 AND assignment_id = 23;
    })
    .put(function(req, res){
        var doc = req.body;
        pg.connect(connectionString, function(err, client, done){
            if (err) console.log('error connecting to database: ', err);
            client.query("UPDATE users_assignments_junction SET update_time = 'now', status_code = 2, instructor_feedback = $1 " +
                "WHERE assignment_id = $2 AND user_id = $3;", [doc.instructor_feedback, doc.assignment_id, doc.user_id],
            function(err, result){
                if (err) {
                    console.log('error writing to database: ', err);
                    res.send(false);
                }
                return res.send('updated assignment!');
            })
        });
    });


module.exports = router;