/**
 * Created by jakobgaardandersen on 29/10/14.
 */
var express = require('express');
var mongo = require('../database/mongo');
var router = express.Router();
var models = require('../database/model');

/* Lists all employees in a table */
router.get('/', function(req, res) {
    getEmployees(function (err, employees) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            res.render('employees', {employees: employees});
        }
    });
});

/* Fecthes all employees in the database */
function getEmployees(callback) {
    mongo.connect();
    var employees = [];
    models.EmployeeModel.find(function (err, data) {
        if (err) {
            callback(err);
            console.log(err);
        } else {
            employees = data;
        }
        mongo.close();
        callback(null, employees);
    });
}

/* Renders the employee details view */
router.get('/:id', function (req, res) {
    var id = req.param('id');
    getEmployee(id, function (err, data) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            console.log(data);
            res.render('employeedetails', {employee: data});
        }
    });
});

/* Gets employee from database with the specific ID */
function getEmployee(id, callback) {
    mongo.connect();
    var employee;
    models.EmployeeModel.find({_id: id}).exec(function (err, data) {
        if (err) {
            console.log('Error in getEmployee ' + err);
            callback(err);
        } else {
            employee = data[0];
        }
        mongo.close();
        callback(null, employee);
    });
}

module.exports = router;