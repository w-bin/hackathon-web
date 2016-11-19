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
            return;
        }
        client.query('select A.card_id,A.user_id,A.product_id,A.selected_number,B.product_name,B.product_describe,B.product_price,' +
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
                            cardId: result.rows[i].card_id,
                            userId: result.rows[i].user_id,
                            productId: result.rows[i].product_id,
                            selectedNumber: result.rows[i].selected_number,
                            productName: result.rows[0].product_name,
                            productDescribe: result.rows[0].product_describe,
                            productPrice: result.rows[0].product_price,
                            productNumber: result.rows[0].product_number,
                            kindId: result.rows[i].kind_id,
                            imgUrl: result.rows[i].img_url
                        });
                    }
                    callback(null, shoppingCardsList);
                }
            });
    });
};

module.exports.createShoppingCardOne = function (userId, productId, selectedNumber, callback) {
    if (isNaN(userId) || isNaN(productId)) {
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
            client.query('insert into shopping_card(user_id,product_id,selected_number) values($1,$2,$3)', [userId, productId, selectedNumber],
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
            return;
        }
        client.query('select A.card_id,A.user_id,A.product_id,A.selected_number,B.product_name,B.product_describe,B.product_price,' +
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
                        cardId: result.rows[0].card_id,
                        userId: result.rows[0].user_id,
                        productId: result.rows[0].product_id,
                        selectedNumber: result.rows[0].selected_number,
                        productName: result.rows[0].product_name,
                        productDescribe: result.rows[0].product_describe,
                        productPrice: result.rows[0].product_price,
                        productNumber: result.rows[0].product_number,
                        kindId: result.rows[0].kind_id,
                        imgUrl: result.rows[0].img_url
                    };
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
            return;
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

module.exports.updateShoppingCardOne = function (userId, cardId, selectedNumber, callback) {
    if (isNaN(userId) || isNaN(cardId) || isNaN(selectedNumber) || selectedNumber <= 0) {
        callback('参数不正确...');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，更新失败...");
            return;
        }
        async.series([
            function (callback) {
                client.query('select product_number from product A,shopping_card B where A.product_id=B.product_id and user_id=$1 and card_id=$2',
                    [userId, cardId],
                    function (err, result) {
                        client.end();
                        if (err) {
                            console.log(err);
                            callback("出了点问题，更新失败...");
                        } else if (result.rows.length == 0) {
                            console.log(err);
                            callback("出了点问题，更新失败...");
                        } else {
                            if (selectedNumber > result.rows[0].product_number) {
                                callback('商品存储不足...');
                            } else {
                                callback(null);
                            }
                        }
                    });
            }, function (callback) {
                client.query('update shopping_card set selected_number=$1 where user_id=$2 and card_id=$3',
                    [selectedNumber, userId, cardId],
                    function (err, result) {
                        client.end();
                        if (err) {
                            console.log(err);
                            callback("出了点问题，删除失败...");
                        } else {
                            callback(null);
                        }
                    });
            }],
            function (err, results) {
                if(err){
                    callback("出了点问题，更新失败...");
                }else{
                    callback(null);
                }
            }
        );

    });
};