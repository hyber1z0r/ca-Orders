/**
 * Created by jakobgaardandersen on 28/10/14.
 */
var mongoose = require('mongoose');

module.exports.connect = function () {
    mongoose.connect('mongodb://localhost/northwind');
    mongoose.connection.once('open', function () {
        console.log('Connected to db');
    });
};

module.exports.close = function () {
    mongoose.connection.close();
};