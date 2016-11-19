/**
 * Created by wbin on 2016/11/19.
 */
var Kind = require('../models/kind');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getKindsList = function (req, res, next) {
    Kind.getKindsList(function (err, kindList) {
        if (err) {
            sendJSONResponse(res, 404, {
                result: false,
                err: err,
                kindsList: null
            });
            return;
        }
        sendJSONResponse(res, 200, {
            result: true,
            err: null,
            kindsList: kindList
        });
    });
};

module.exports.createKind = function (req, res, next) {

};

module.exports.getKindOne = function (req, res, next) {
    if (req.params && req.params.kindId) {
        Kind.getKindOne(req.params.kindId, function (err, kind) {
            if (err) {
                sendJSONResponse(res, 404, {
                    result: false,
                    err: err,
                    kind: null
                });
                return;
            }
            sendJSONResponse(res, 200, {
                result: true,
                err: null,
                kind: kind
            });
        });
    } else {
        sendJSONResponse(res, 404, {
            result: false,
            err: '出错了...',
            kind: null
        });
    }
}

module.exports.updateKindOne = function (req, res, next) {

};

module.exports.deleteKindOne = function (req, res, next) {

};