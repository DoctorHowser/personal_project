var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/PrimeOrigin';

router.route('/')
    .get(function(req,res){
        pg.connect(connectionString, function(err, client, done){
                var results = [];
                var query = client.query("SELECT students.first_name, students_assignments_junction.*, assignments.* " +
                "FROM students " +
                "JOIN students_assignments_junction " +
                "ON (students.id = students_assignments_junction.student_id) " +
                "JOIN assignments " +
                "ON (assignments.id = students_assignments_junction.assignment_id) " +
                "WHERE students_assignments_junction.status_code = 1;");

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
    .put(function(req, res){
        var doc = req.body;
        pg.connect(connectionString, function(err, client, done){
            if (err) console.log('error connecting to database: ', err);
            client.query("UPDATE students_assignments_junction SET update_time = 'now', status_code = 2, instructor_feedback = $1 " +
                "WHERE assignment_id = $2 AND student_id = $3;", [doc.instructor_feedback, doc.assignment_id, doc.student_id],
            function(err, result){
                if (err) {
                    console.log('error writing to database: ', err);
                    res.send(false);
                }
                res.send('updated assignment!');
            })
        });
    });


module.exports = router;