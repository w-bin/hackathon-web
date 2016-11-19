/**
 * Created by wbin on 2016/11/19.
 */
var pg = require('pg');
var config = require('../../DBconfig');
var async = require('async');

module.exports.getKindsList = function (callback) {
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
        }
        client.query('select kind_id,kind_name from kind', [],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else {
                    var kindList = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        kindList.push({
                            kindId: result.rows[i].kind_id,
                            kindName: result.rows[i].kind_name
                        });
                    }
                    callback(null, kindList);
                }
            })
    });
};

module.exports.getKindOne = function (kindId, callback) {
    if (isNaN(kindId)) {
        callback('参数必须为数字');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
        }
        client.query('select kind_id,kind_name from kind where kind_id=$1', [kindId],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else {
                    var kind = {
                        kindId: result.rows[0].kind_id,
                        kindName: result.rows[0].kind_name
                    };
                    callback(null, kind);
                }
            })
    });
};