/**
 * Created by wbin on 2016/11/19.
 */
var Order = require('../models/order');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getOrdersList = function (req, res, next) {
    Order.getOrdersList(req.params.userId,function (err, orders) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                orders: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            orders: orders
        });
    });
};

module.exports.createOrdersOne = function (req, res, next) {

}

module.exports.getOrdersOne = function (req, res, next) {

};

module.exports.updateOrdersOne = function (req, res, next) {

}

module.exports.deleteOrdersOne = function (req, res, next) {

};