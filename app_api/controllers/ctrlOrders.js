/**
 * Created by wbin on 2016/11/19.
 */
var Order = require('../models/order');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getOrdersList = function (req, res, next) {
    Order.getOrdersList(req.params.userId, function (err, ordersList) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                ordersList: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            ordersList: ordersList
        });
    });
};

module.exports.createOrdersOne = function (req, res, next) {
    console.log('create order req.body = ' + req.body.productsList.length);
    Order.createOrdersOne(req.body.userId, req.body.productsList, function (err) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null
        });
    });
};

module.exports.getOrdersOne = function (req, res, next) {
    Order.getOrdersOne(req.params.userId, req.params.orderId, function (err, order) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                order: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            order: order
        });
    });
};

module.exports.updateOrdersOne = function (req, res, next) {

};

module.exports.deleteOrdersOne = function (req, res, next) {

};