/**
 * Created by wbin on 2016/11/19.
 */
var pg = require('pg');
var config = require('../../DBconfig');
var async = require('async');

module.exports.getOrdersList = function (userId, callback) {
    if (isNaN(userId)) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
        }
        client.query('select A.order_id,A.user_id,A.product_id,A.time,B.product_name,B.product_describe,B.product_price,' +
            'B.product_number,B.kind_id,B.img_url from my_order A,product B where A.user_id=$1 and A.product_id=B.product_id',
            [userId],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else {
                    var ordersList = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        ordersList.push({
                            orderId: result.rows[i].order_id,
                            userId: result.rows[i].user_id,
                            time: result.rows[i].time,
                            productId: result.rows[i].product_id,
                            productName: result.rows[i].product_name,
                            productDescribe: result.rows[i].product_describe,
                            productPrice: result.rows[i].product_price,
                            productNumber: result.rows[i].product_number,
                            kindId: result.rows[i].kind_id,
                            imgUrl: result.rows[i].img_url
                        });
                    }
                    callback(null, ordersList);
                }
            });
    });
};

module.exports.createOrdersOne = function (userId, callback) {
    if (isNaN(userId)) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
            if (err) {
                console.log(err);
                callback("出了点问题，添加失败...");
            }
            client.query('insert into my_   order(user_id,product_id) values($1,$2)', [userId, productId],
                function (err, result) {
                    client.end();
                    if (err) {
                        console.log(err);
                        callback("出了点问题，添加失败...");
                    } else {
                        callback(null);
                    }
                }
            );
        }
    );
};

module.exports.getOrdersOne = function (userId, orderId, callback) {

};

module.exports.updateOrdersOne = function (userId, orderId, callback) {

};

module.exports.deleteOrdersOne = function (userId, orderId, callback) {

};
