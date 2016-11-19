/**
 * Created by wbin on 2016/11/19.
 */

var User = require('../models/user');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.createUser = function (req, res) {

};

module.exports.login = function (req, res) {
    console.log(req.body.username + '  ' + req.body.password);
    User.login(req.body.username, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                userId: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            userId: user.userId
        });
    });
};

