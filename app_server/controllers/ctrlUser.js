/**
 * Created by wbin on 2016/11/19.
 */
var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};

module.exports.getLogin = function (req, res, next) {
    res.render('login', {
        title: '登陆'
    });
};
/*
module.exports.postLogin = function (req, res, next) {
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};
*/
module.exports.getReg = function (req, res, next) {
    res.render('reg', {
        title: '注册'
    });
}

module.exports.postReg = function (req, res, next) {

}