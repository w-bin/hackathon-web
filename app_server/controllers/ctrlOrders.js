/**
 * Created by wbin on 2016/11/20.
 */
var request = require('request');
var async = require('async');
var apiOptions = {
    server: "http://localhost:3000"
};

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};

module.exports.createOrderOneTmp = function (req, res, next) {
    var checkboxs = req.body.checkboxs;
    var productsList = [];
    async.each(checkboxs, function (productId, callback) {
        var requestOptions, path;
        path = "/api/products/" + productId;
        requestOptions = {
            url: apiOptions.server + path,
            method: "GET",
            json: {}
        };
        request(
            requestOptions,
            function (err, response, body) {
                console.log(response.statusCode + '  ' + body.result + body.err);
                if (response.statusCode === 200 && body.result == true) {
                    console.log(body.product);
                    productsList.push(body.product);
                    callback();
                } else {
                    callback(null);
                }
            }
        );
    }, function (err) {
        if (err) {
            _showError(req, res, 404);
        } else {
            res.render('orderItem', {
                title: '订单',
                user: req.session.user,
                productsList: productsList
            });
        }
    });
};

module.exports.createOrderOneTmp2 = function (req, res, next) {
    var requestOptions, path;
    path = "/api/users/" + req.session.user.userId + '/shoppingcards';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            console.log(response.statusCode + '  ' + body.result + body.err);
            if (response.statusCode === 200 && body.result == true) {
                res.render('orderItem', {
                    title: '订单',
                    user: req.session.user,
                    productsList: body.shoppingCardsList
                });
            } else {
                _showError(req, res, 404);
            }
        }
    );
}

module.exports.createOrderOne = function (req, res, next) {
    var requestOptions, path;
    path = "/api/users/" + req.session.user.userId + "/orders";
    var productsList0 = [];
    for (var i = 0; i < req.body.productId.length; i++) {
        productsList0.push({
            productId: req.body.productId[i],
            cardId: req.body.cardId[i],
            buyNumber: req.body.buyNumber[i],
        });
    }
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: {
            userId: req.session.user.userId,
            productsList: productsList0
        }
    };

    var productsList = [];
    request(
        requestOptions,
        function (err, response, body) {
            console.log(response.statusCode + '  ' + body.result + body.err);
            if (response.statusCode === 200 && body.result == true) {
                async.each(productsList0, function (product, callback) {
                    path = "/api/products/" + product.productId;
                    requestOptions = {
                        url: apiOptions.server + path,
                        method: "GET",
                        json: {}
                    };
                    request(
                        requestOptions,
                        function (err, response, body) {
                            console.log(response.statusCode + '  ' + body.result + body.err);
                            if (response.statusCode === 200 && body.result == true) {
                                //console.log(body.product);
                                productsList.push(body.product);
                                callback();
                            } else {
                                callback(null);
                            }
                        }
                    );
                }, function (err) {
                    if (err) {
                        _showError(req, res, 404);
                    } else {
                        for (var i = 0; i < productsList.length; i++) {
                            productsList[i].buyNumber = productsList0[i].buyNumber;
                        }
                        res.render('orderItemComplete', {
                            title: '订单详情',
                            user: req.session.user,
                            productsList: productsList
                        });
                    }
                });
            } else {
                _showError(req, res, 404);
            }
        }
    );
};