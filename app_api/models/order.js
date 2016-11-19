/**
 * Created by wbin on 2016/11/19.
 */
var pg = require('pg');
var config = require('../../DBconfig');
var async = require('async');
var Order = this;

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
            return;
        }
        client.query('select order_id from my_order where user_id=$1',
            [userId],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else if (result.rows.length == 0) {
                    callback("无数据...");
                } else {
                    var orderIds = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        orderIds.push(
                            result.rows[i].order_id
                        );
                    }
                    var ordersList = [];
                    async.each(orderIds, function (orderId, callback) {
                        Order.getOrdersOne(userId, orderId, function (err, order) {
                            if (err) {
                                console.log(err);
                                callback("出了点问题，获取失败...");
                                return;
                            }
                            ordersList.push(order);
                            callback();
                        });
                    }, function (err) {
                        if (err) {
                            console.log(err);
                            callback("出了点问题，获取失败...");
                        } else {
                            callback(null, ordersList);
                        }
                    });
                }
            }
        );
    });
};

module.exports.createOrdersOne = function (userId, productIdsList, callback) {
    if (isNaN(userId)) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，添加失败...");
            return;
        }
        client.query('insert into my_order(user_id) values($1) returning order_id', [userId],
            function (err, result) {
                //client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，添加失败...");
                } else {
                    var orderId = result.rows[0].order_id;
                    console.log('productIdsList = ' + typeof(JSON.parse(productIdsList)));
                    async.each(JSON.parse(productIdsList), function (product, callback) {
                        console.log(product + '  ' + product.productId + '  ' + product.buyNumber);
                        client.query('insert into order_and_product(order_id,product_id,buy_number) values($1,$2,$3)',
                            [orderId, product.productId, product.buyNumber],
                            function (err, result) {
                                if (err) {
                                    console.log(err);
                                    callback("出了点问题，添加失败...");
                                    return;
                                }
                                client.query('delete from shopping_card where card_id=$1', [product.cardId],
                                    function () {
                                        if (err) {
                                            console.log(err);
                                            callback("出了点问题，添加失败...");
                                            return;
                                        }
                                        callback();
                                    });
                            });
                    }, function (err) {
                        client.end();
                        if (err) {
                            console.log(err);
                            callback("出了点问题，获取失败...");
                        } else {
                            callback(null);
                        }
                    });
                }
            }
        );
    });
};

module.exports.getOrdersOne = function (userId, orderId, callback) {
    if (isNaN(userId) || isNaN(orderId)) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
            return;
        }
        client.query('select A.order_id,A.user_id,A.time,B.product_id,B.product_name,B.product_describe,B.product_price,' +
            'B.product_number,B.kind_id,B.img_url,C.buy_number from my_order A,product B,order_and_product C where A.user_id=$1 and A.order_id=$2 and A.order_id=C.order_id and B.product_id=C.product_id',
            [userId, orderId],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else if (result.rows.length == 0) {
                    callback("数据不存在...");
                } else {
                    var productsList = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        productsList.push({
                            productId: result.rows[i].product_id,
                            productName: result.rows[i].product_name,
                            productDescribe: result.rows[i].product_describe,
                            productPrice: result.rows[i].product_price,
                            productNumber: result.rows[i].product_number,
                            kindId: result.rows[i].kind_id,
                            imgUrl: result.rows[i].img_url,
                            buyNumber: result.rows[i].buy_number
                        });
                    }
                    var order = {
                        orderId: result.rows[0].order_id,
                        userId: result.rows[0].user_id,
                        time: result.rows[0].time,
                        productsList: productsList
                    };
                    callback(null, order);
                }
            });
    });


};

module.exports.updateOrdersOne = function (userId, orderId, callback) {

};

module.exports.deleteOrdersOne = function (userId, orderId, callback) {

};
