/**
 * Created by wbin on 2016/11/19.
 */
var pg = require('pg');
var config = require('../../DBconfig');
var async = require('async');

module.exports.getProductsList = function (callback) {
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
            return;
        }
        client.query('select product_id,product_name,product_describe,product_price,product_number,' +
            'kind_id,img_url from product', [],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else {
                    var productList = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        productList.push({
                            productId: result.rows[i].product_id,
                            name: result.rows[i].product_name,
                            describe: result.rows[i].product_describe,
                            price: result.rows[i].product_price,
                            number: result.rows[i].product_number,
                            kindId: result.rows[i].kind_id,
                            imgUrl: result.rows[i].img_url
                        });
                    }
                    callback(null, productList);
                }
            });
    });
};

module.exports.getProductsListByKindId = function (kindId, callback) {
    if (isNaN(kindId)) {
        callback('参数必须为数字');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
            return;
        }
        client.query('select product_id,product_name,product_describe,product_price,product_number,' +
            'kind_id,img_url from product where kind_id=$1',
            [parseInt(kindId)],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else {
                    var productList = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        productList.push({
                            productId: result.rows[i].product_id,
                            name: result.rows[i].product_name,
                            describe: result.rows[i].product_describe,
                            price: result.rows[i].product_price,
                            number: result.rows[i].product_number,
                            kindId: result.rows[i].kind_id,
                            imgUrl: result.rows[i].img_url
                        });
                    }
                    callback(null, productList);
                }
            });
    });
};

module.exports.getProductOne = function (productId, callback) {
    if (isNaN(productId)) {
        callback('参数必须为数字');
        return;
    }
    var client = new pg.Client(config);
    client.connect(function (err) {
        if (err) {
            console.log(err);
            callback("出了点问题，获取失败...");
            return;
        }
        client.query('select product_id,product_name,product_describe,product_price,product_number,' +
            'kind_id,img_url from product where product_id=$1',
            [parseInt(productId)],
            function (err, result) {
                client.end();
                if (err) {
                    console.log(err);
                    callback("出了点问题，获取失败...");
                } else if (result.rows.length == 0) {
                    callback("找不到商品");
                } else {
                    var product = {
                        productId: result.rows[0].product_id,
                        name: result.rows[0].product_name,
                        describe: result.rows[0].product_describe,
                        price: result.rows[0].product_price,
                        number: result.rows[0].product_number,
                        kindId: result.rows[0].kind_id,
                        imgUrl: result.rows[0].img_url
                    };
                    callback(null, product);
                }
            });
    });
};
