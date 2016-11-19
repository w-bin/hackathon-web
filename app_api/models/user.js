/**
 * Created by wbin on 2016/11/19.
 */
var pg = require('pg');
var config = require('../../DBconfig');
var async = require('async');

function User(user) {

}

module.exports.createUser = function (username, password, callback) {
    var client = new pg.Client(config);
    var user = this;
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，注册失败...");
        }
        client.query('select * from user where username=$1', [username],
            function (err, result) {
                if (err) {
                    console.log(err);
                    callback("出了点问题，注册失败...");
                } else if (result) {
                    callback("用户名已存在...");
                } else {
                    client.query('insert into user(username,password) values($1,$2)', [username, password],
                        function (err, result) {
                            client.end();
                            if (err) {
                                console.log(err);
                                callback("出了点问题，注册失败...");
                            } else {
                                callback(null);
                            }
                        }
                    );
                }
            }
        );
    });
};

module.exports.login = function (username, password, callback) {
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，登陆失败...");
        }
        client.query('select user_id,password,role from myuser where username=$1', [username],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，登陆失败...");
                } else if (result.rows.length == 0 || result.rows[0].password != password) {
                    callback("账号密码错误");
                } else {
                    var user = {
                        userId: result.rows[0].user_id,
                        username: username,
                        role: result.rows[0].role_id,
                    };
                    callback(null, user);
                }
            })
    });
};