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

module.exports.getProductsList = function (req, res, next) {
    async.waterfall([
        function (callback) {
            var path = "/api/kinds";
            var requestOptions = {
                url: apiOptions.server + path,
                method: "GET",
                json: {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    callback(body.err, body.kindsList);
                }
            );
        }, function (kindsList, callback) {
            var path = "/api/products";
            var requestOptions = {
                url: apiOptions.server + path,
                method: "GET",
                json: {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    callback(body.err, kindsList, body.productsList);
                }
            );
        }
    ], function (err, kindsList, productsList) {
        if (err) {
            _showError(req, res, 404);
            return;
        }
        var tip = req.session.tip;
        req.session.tip = null;
        res.render('index', {
            title: '首页',
            tip: tip,
            user: req.session.user,
            kindsList: kindsList,
            productsList: productsList
        });
    });
};

module.exports.getProductsListByKindId = function (req, res, next) {
    async.waterfall([
        function (callback) {
            var path = "/api/kinds";
            var requestOptions = {
                url: apiOptions.server + path,
                method: "GET",
                json: {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    callback(body.err, body.kindsList);
                }
            );
        }, function (kindsList, callback) {
            var path = "/api/kinds/" + req.params.kindId + '/products';
            var requestOptions = {
                url: apiOptions.server + path,
                method: "GET",
                json: {}
            };
            request(
                requestOptions,
                function (err, response, body) {
                    callback(body.err, kindsList, body.productsList);
                }
            );
        }
    ], function (err, kindsList, productsList) {
        if (err) {
            _showError(req, res, 404);
            return;
        }
        var title = '首页';
        for (var i = 0; i < kindsList.length; i++) {
            if (kindsList[i].kindId == req.params.kindId) {
                title = kindsList[i].kindName;
            }
            console.log(kindsList[i].kindId + '  ' + kindsList[i].kindName);
        }
        var tip = req.session.tip;
        req.session.tip = null;
        res.render('index', {
            title: title,
            tip: tip,
            user: req.session.user,
            kindsList: kindsList,
            productsList: productsList
        });
    });
};

module.exports.getProductOne = function (req, res, next) {
    var requestOptions, path;
    path = "/api/products/" + req.params.productId;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 200) {
                if (body.result == true) {
                    var tip = req.session.tip;
                    req.session.tip = null;
                    res.render('productDetail', {
                        title: '商品详情页',
                        tip: tip,
                        user: req.session.user,
                        product: body.product
                    });
                } else {
                    req.session.tip = body.err;
                    res.redirect('/');
                }
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};