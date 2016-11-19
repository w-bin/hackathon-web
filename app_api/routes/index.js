/**
 * Created by wbin on 2016/11/19.
 */
var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/ctrlUsers');
var ctrlKinds = require('../controllers/ctrlKinds');
var ctrlProducts = require('../controllers/ctrlProducts');
var ctrlShoppingCards = require('../controllers/ctrlShoppingCards');
var ctrlOrder = require('../controllers/ctrlOrders');

router.post('/login', ctrlUsers.login);

router.post('/users', ctrlUsers.createUser);
//router.get('/users/:userId',);

//购物车
router.get('/users/:userId/shoppingCards', ctrlShoppingCards.getShoppingCardsList);
router.post('/users/:userId/shoppingCards', ctrlShoppingCards.createShoppingCardOne);
router.get('/users/:userId/shoppingCards/:shoppingCardId', ctrlShoppingCards.getShoppingCardOne);
router.put('/users/:userId/shoppingCards/:shoppingCardId', ctrlShoppingCards.updateShoppingCardOne);
router.delete('/users/:userId/shoppingCards/:shoppingCardId', ctrlShoppingCards.deleteShoppingCardOne);

//订单
router.get('/users/:userId/orders', ctrlOrder.getOrdersList);
router.post('/users/:userId/orders', ctrlOrder.createOrdersOne);
router.get('/users/:userId/orders/:orderId', ctrlOrder.getOrdersOne);
router.put('/users/:userId/orders/:orderId', ctrlOrder.updateOrdersOne);
router.delete('/users/:userId/orders/:orderId', ctrlOrder.deleteOrdersOne);

//商品种类
router.get('/kinds', ctrlKinds.getKindsList);
router.post('/kinds', ctrlKinds.createKind);
router.get('/kinds/:kindId', ctrlKinds.getKindOne);
router.put('/kinds/:kindId', ctrlKinds.updateKindOne);
router.delete('/kinds/:kindId', ctrlKinds.deleteKindOne);
router.get('/kinds/:kindId/products', ctrlProducts.getKindProductsList);
router.post('/kinds/:kindId/products', ctrlProducts.createProduct);

//商品
router.get('/products', ctrlProducts.getAllProductsList);
router.get('/products/:productId', ctrlProducts.getProductOne);
router.put('/products/:productId', ctrlProducts.updateProductOne);
router.delete('/products/:productId', ctrlProducts.deleteProductOne);

module.exports = router;
