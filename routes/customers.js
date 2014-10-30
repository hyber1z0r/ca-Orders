/**
 * Created by jakobgaardandersen on 29/10/14.
 */
var express = require('express');
var mongo = require('../database/mongo');
var router = express.Router();
var models = require('../database/model');

/* Lists all customers in a table */
router.get('/', function(req, res) {
    getCustomers(function (err, customers) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            res.render('customers', {customers: customers});
        }
    });
});

/* Fecthes all customers in the database */
function getCustomers(callback) {
    mongo.connect();
    var customers = [];
    models.CustomerModel.find(function (err, data) {
        if (err) {
            callback(err);
            console.log(err);
        } else {
            customers = data;
        }
        mongo.close();
        callback(null, customers);
    });
}


/* Renders the customer details view */
router.get('/:id', function (req, res) {
    var id = req.param('id');
    getCustomer(id, function (err, data) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            res.render('customerdetails', {customer: data});
        }
    });
});

/* Gets customer from database with the specific ID */
function getCustomer(id, callback) {
    mongo.connect();
    var customer;
    models.CustomerModel.find({_id: id}).exec(function (err, data) {
        if (err) {
            console.log('Error in getCustomer ' + err);
            callback(err);
        } else {
            customer = data[0];
        }
        mongo.close();
        callback(null, customer);
    });
}

module.exports = router;