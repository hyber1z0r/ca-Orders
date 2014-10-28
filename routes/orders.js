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

router.get('/:id', function (req, res) {
    var id = req.param('id');
    getOrder(id, function (err, data) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            getOrderDetails(id, function (err, detailsData) {
                if (err) {
                    res.render(error, {
                        message: err.message,
                        error: err
                    });
                } else {
                    var dataObj = {order: data, orderDetails: detailsData};
                    console.log(dataObj);
                    res.render('orderdetails', dataObj);
                }
            });
        }
    });
});

function getOrder(id, callback) {
    mongo.connect();
    var order;
    models.OrderModel.find({_id: id}, function (err, data) {
        if (err) {
            console.log('Error in getOrder ' + err);
            callback(err);
        } else {
            order = data[0];
        }
        mongo.close();
        callback(null, order);
    });
}

function getOrderDetails(id, callback) {
    mongo.connect();
    var orderDetails = [];
    models.DetailsModel.find({orderId: id}, function (err, data) {
        if (err) {
            console.log('Error in getorderDetails ' + err);
            callback(err);
        } else {
            orderDetails = data;
        }
        mongo.close();
        callback(null, orderDetails);
    });
}

module.exports = router;

