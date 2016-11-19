/**
 * Created by wbin on 2016/11/19.
 */
var ShoppingCard = require('../models/shoppingCard');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getShoppingCardsList = function (req, res, next) {
    ShoppingCard.getShoppingCardsList(req.params.userId, function (err, shoppingCardsList) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                shoppingCardsList: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            shoppingCardsList: shoppingCardsList
        });
    });
};

module.exports.createShoppingCardOne = function (req, res, next) {
    ShoppingCard.createShoppingCardOne(req.body.userId, req.body.productId, function (err, shoppingCard) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                shoppingCard: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            shoppingCard: shoppingCard
        });
    });
};

module.exports.getShoppingCardOne = function (req, res, next) {
    ShoppingCard.getShoppingCardOne(req.params.userId, req.params.shoppingCardId, function (err, shoppingCard) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                shoppingCard: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            shoppingCard: shoppingCard
        });
    });
};

module.exports.updateShoppingCardOne = function (req, res, next) {

};

module.exports.deleteShoppingCardOne = function (req, res, next) {
    ShoppingCard.deleteShoppingCardOne(req.params.userId, req.params.shoppingCardId, function (err) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
        });
    });
};