/**
 * Created by wbin on 2016/11/19.
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

module.exports.getLogin = function (req, res, next) {
    req.session.user = null;
    var tip = req.session.tip;
    req.session.tip = null;
    res.render('login', {
        title: '登陆',
        tip: tip
    });
};

module.exports.postLogin = function (req, res, next) {
    var requestOptions, path;
    path = "/api/login";
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: {
            username: req.body.username,
            password: req.body.password
        }
    };
    request(
        requestOptions,
        function (err, response, body) {
            console.log(response.statusCode + '   ' + body.result);
            if (response.statusCode === 200) {
                if (body.result == true) {
                    req.session.user = body.user;
                    res.redirect('/');
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

module.exports.getReg = function (req, res, next) {
    res.render('reg', {
        title: '注册'
    });
}

module.exports.postReg = function (req, res, next) {

}