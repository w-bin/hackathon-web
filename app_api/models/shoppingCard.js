/**
 * Created by wbin on 2016/11/19.
 */
var pg = require('pg');
var config = require('../../DBconfig');
var async = require('async');

module.exports.getShoppingCardsList = function (userId, callback) {
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
        client.query('select A.card_id,A.user_id,A.product_id,B.product_name,B.product_describe,B.product_price,' +
            'B.product_number,B.kind_id,B.img_url from shopping_card A,product B where A.user_id=$1 and A.product_id=B.product_id',
            [userId],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else {
                    var shoppingCardsList = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        shoppingCardsList.push({
                            card_id: result.rows[i].card_id,
                            user_id: result.rows[i].user_id,
                            product_id: result.rows[i].product_id,
                            name: result.rows[i].name,
                            describe: result.rows[i].describe,
                            price: result.rows[i].price,
                            number: result.rows[i].number,
                            kind_id: result.rows[i].kind_id,
                            img_url: result.rows[i].img_url,
                        });
                    }
                    callback(null, shoppingCardsList);
                }
            });
    });
};

module.exports.createShoppingCardOne = function (userId, productId, callback) {
    if (isNaN(userId) || isNaN(productId)) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
            if (err) {
                console.log(err);
                callback("出了点问题，添加失败...");
            }
            client.query('insert into shopping_card(user_id,product_id) values($1,$2)', [userId, productId],
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

module.exports.getShoppingCardOne = function (userId, shoppingCardId, callback) {
    if (isNaN(shoppingCardId) || isNaN(userId)) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
        }
        client.query('select A.card_id,A.user_id,A.product_id,B.product_name,B.product_describe,B.product_price,' +
            'B.product_number,B.kind_id,B.img_url from shopping_card A,product B where A.user_id=$1 ' +
            'and A.card_Id=$2 and A.product_id=B.product_id',
            [userId, shoppingCardId],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else if (result.rows.length == 0) {
                    callback("找不到数据...");
                } else {
                    var shoppingCard = {
                        cardId: result.rows[i].card_id,
                        userId: result.rows[i].user_id,
                        productId: result.rows[i].product_id,
                        productName: result.rows[i].product_name,
                        productDescribe: result.rows[i].product_describe,
                        productPrice: result.rows[i].product_price,
                        productNumber: result.rows[i].product_number,
                        kindId: result.rows[i].kind_id,
                        imgUrl: result.rows[i].img_url
                    }
                    callback(null, shoppingCard);
                }
            });
    });
};

module.exports.deleteShoppingCardOne = function (userId, cardId, callback) {
    if (isNaN(userId) || isNaN(cardId)) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，删除失败...");
        }
        client.query('delete from shopping_card where user_id=$1 and card_id=$2',
            [userId, cardId],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，删除失败...");
                } else {
                    callback(null);
                }
            });
    });
};