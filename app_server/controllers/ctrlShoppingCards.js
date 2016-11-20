/**
 * Created by wbin on 2016/11/20.
 */
var request = require('request');
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

module.exports.createShoppingCardOne = function (req, res, next) {
    var requestOptions, path;
    path = "/api/users/" + req.session.user.userId + '/shoppingCards';
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: {
            userId: req.session.user.userId,
            productId: req.body.productId
        }
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 200) {
                if (body.result == true) {
                    req.session.tip = '添加成功';
                    res.redirect('back');
                } else {
                    req.session.tip = body.err;
                    res.redirect('back');
                }
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports.getShoppingCardsList = function (req, res, next) {
    var requestOptions, path;
    path = "/api/users/" + req.session.user.userId + '/shoppingCards';
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
                    console.log('body.shoppingCardsList = ' + body.shoppingCardsList.toString());
                    res.render('shoppingCardsList', {
                        title: '我的购物车',
                        shoppingCardsList: body.shoppingCardsList
                    })
                } else {
                    res.redirect('shoppingCardsList', {
                        title: '我的购物车',
                        tip: body.tip,
                        shoppingCardsList: body.shoppingCardsList
                    });
                }
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};