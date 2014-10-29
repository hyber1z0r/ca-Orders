/**
 * Created by jakobgaardandersen on 29/10/14.
 */
var express = require('express');
var mongo = require('../database/mongo');
var router = express.Router();
var models = require('../database/model');

router.get('/:id', function (req, res) {
    var id = req.param('id');
    getCustomer(id, function (err, data) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            console.log(data);
            res.render('customers', {customer: data});
        }
    });
});

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