/**
 * Created by jakobgaardandersen on 30/10/14.
 */
var express = require('express');
var mongo = require('../database/mongo');
var router = express.Router();
var models = require('../database/model');

/* The get request for /products that renders all products in a table */
router.get('/', function (req, res) {
    getProducts(function (err, products) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            res.render('products', {products: products});
        }
    });
});

/* Fecthes all products in the database */
function getProducts(callback) {
    mongo.connect();
    var products = [];
    models.ProductModel.find(function (err, data) {
        if (err) {
            callback(err);
            console.log(err);
        } else {
            products = data;
        }
        mongo.close();
        callback(null, products);
    });
}

/* Renders detailed information about the product, + all the orders with this product in it  */
router.get('/:id', function (req, res) {
    var id = req.param('id');
    getProduct(id, function (err, product) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            getOrdersWithProduct(id, function (err, orders) {
                if (err) {
                    res.render(error, {
                        message: err.message,
                        error: err
                    });
                } else {
                    var dataObj = {product: product, orders: orders};
                    res.render('productdetails', dataObj);
                }
            });
        }
    });
});


/* Gets product information for one specific product! */
function getProduct(id, callback) {
    mongo.connect();
    var product;
    models.ProductModel.find({_id: id}).exec(function (err, data) {
        if (err) {
            console.log('Error in getProduct ' + err);
            callback(err);
        } else {
            product = data[0];
        }
        mongo.close();
        callback(null, product);
    });
}
/* Fetches an array with orderdetails that has a populated order, that has something to do with a specific product */
function getOrdersWithProduct(pId, callback) {
    mongo.connect();
    var orders = [];
    models.DetailsModel.find({product: pId}).populate('order').exec(function (err, data) {
        if (err) {
            callback(err);
        } else {
            orders = data;
            callback(null, orders);
        }
        mongo.close();
    })
}


module.exports = router;