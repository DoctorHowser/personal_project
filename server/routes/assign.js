var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/PrimeOrigin';

router.post('/', function(req,res) {
    var assignment = {
        title: req.body.title,
        description: req.body.description,
        resource: req.body.resource,
        cohort: req.body.cohort
    };



   //Creates new row in assignment table, links to cohort members in people table via junction table.
    pg.connect(connectionString, function (err, client, done) {
        if (err) console.log('error connecting to the DB: ', err);

        client.query("INSERT INTO assignments (title, description, resource_link, date_assigned, assigned_cohort) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
            [assignment.title, assignment.description, assignment.resource, 'now', assignment.cohort],

            function (err, result) {
                //get returning id, save to assignment object for next query
                assignment.id = result.rows[0].id;
                console.log(assignment);
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }

                client.query("INSERT INTO students_assignments_junction  (assignment_id, student_id, status_code) " +
                    "SELECT assignments.id, students.id, 0 FROM assignments, students " +
                    "WHERE students.cohort = assignments.assigned_cohort AND students.cohort = $1 AND assignments.id = $2;", [assignment.cohort, assignment.id],
                    function (err, result) {
                        if (err) {
                            console.log("Error inserting to junction table: ", err);
                            res.send(false);
                        }
                        res.send('created table rows!!');
                    });
            });
    });
    //THIS IS A TEMPLATE FOR RETRIEVING ALL ASSIGNMENTS FOR 1 (logged in!) STUDENT (Student queue)
    //router.get('/')
    //SELECT students.first_name, students_assignments_junction.*, assignments.*
    //FROM students
    //JOIN students_assignments_junction
    //ON (students.id = students_assignments_junction.student_id)
    //JOIN assignments
    //ON (assignments.id = students_assignments_junction.assignment_id)
    //WHERE students.id = 3;

});
module.exports = router;