/**
 * Created by Neno on 30-10-2014.
 */
var express = require('express');
var mongo = require('../database/mongo');
var router = express.Router();
var models = require('../database/model');


/* Lists all categories in a table */
router.get('/', function (req, res) {
    getCategories(function (err, categories) {
        if (err) {
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {
            res.render('categories', {categories: categories});
        }
    });
});


/* Fecthes all categories in the database */
function getCategories(callback) {
    mongo.connect();
    var categories = [];
    models.CategoryModel.find(function (err, data) {
        if (err) {
            callback(err);
            console.log(err);
        } else {
            categories = data;
        }
        mongo.close();
        callback(null, categories);
    });
}

/* Renders the categories products view */
router.get('/:id', function (req, res) {
    var id = req.param('id');
    getCategoryProducts(id, function (err, data) {
        if (err) {
            res.render(error, {
                message: err.message,
                error: err
            });
        } else {
            console.log(data);
            res.render('categoryProducts', {products: data});
        }
    });
});

/* Gets category information for one specific category! */
function getCategoryProducts(id, callback) {
    mongo.connect();
    var categoryP;
    models.ProductModel.find({category: id}).populate('category').exec(function (err, data) {
        if (err) {
            console.log('Error in getCategoryProducts ' + err);
            callback(err);
        } else {
            categoryP = data;
        }
        mongo.close();
        callback(null, categoryP);
    });
}

/* Deletes an existing category in the database */
router.delete('/:id', function (req, res) {
    var id = req.param('id');
    mongo.connect();
    models.CategoryModel.remove({_id: id}, function (err, rowsRemoved) {
        if (err) {
            res.json(err);
        } else if (rowsRemoved == 0) {
            res.json({status: 'not ok'});
            res.end();
            mongo.close();
        }
        else {
            models.ProductModel.remove({category: id}, function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({status: 'ok'});
                }
                mongo.close();
            });
        }
    });
});


module.exports = router;