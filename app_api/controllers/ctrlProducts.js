/**
 * Created by wbin on 2016/11/19.
 */
var Product = require('../models/product');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getAllProductsList = function (req, res, next) {
    Product.getProductsList(function (err, productsList) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                productsList: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            productsList: productsList
        });
    });
};

module.exports.getKindProductsList = function (req, res, next) {
    Product.getProductsListByKindId(req.params.kindId, function (err, productsList) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                productsList: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            productsList: productsList
        });
    });
};

module.exports.createProduct = function (req, res, next) {

};

module.exports.getProductOne = function (req, res, next) {
    Product.getProductOne(req.params.productId, function (err, product) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                product: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            product: product
        });
    });
};

module.exports.updateProductOne = function (req, res, next) {

};

module.exports.deleteProductOne = function (req, res, next) {

};