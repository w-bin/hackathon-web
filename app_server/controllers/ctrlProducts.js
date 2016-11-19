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

module.exports.getProductsList = function (req, res, next) {
    var requestOptions, path;
    path = "/api/kinds";
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
                    res.render('index', {
                        title: '首页'
                    });
                } else {
                    req.session.tip = body.err;
                    res.redirect('/login');
                }
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};