/**
 * Created by jakobgaardandersen on 29/10/14.
 */
var express = require('express');
var mongo = require('../database/mongo');
var router = express.Router();
var models = require('../database/model');

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
            res.render('employees', {employee: data});
        }
    });
});

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