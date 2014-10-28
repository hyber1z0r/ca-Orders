/**
 * Created by jakobgaardandersen on 28/10/14.
 */
var express = require('express');
var mongo = require('../database/mongo');
var router = express.Router();
var models = require('../database/model');

router.get('/', function (req, res) {
    getOrders(function (err, orders) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            console.log(orders);
            res.render('orders', {data: orders});
        }
    });
});

function getOrders(callback) {
    mongo.connect();
    var orders = [];
    models.OrderModel.find(function (err, data) {
        if (err) {
            callback(err);
            console.log(err);
        } else {
            orders = data;
        }
        mongo.close();
        callback(null, orders);
    });
}

router.get('/:id', function(req, res) {

});

module.exports = router;

