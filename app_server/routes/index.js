var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/ctrlUsers');
var ctrlKinds = require('../controllers/ctrlKinds');
var ctrlProducts = require('../controllers/ctrlProducts');
var ctrlShoppingCards = require('../controllers/ctrlShoppingCards');
var ctrlOrder = require('../controllers/ctrlOrders');

//检查当前请求是否已登录
function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    next();
}

//检查当前请求是否具备权限
function checkLevel(req, res, next) {
    if (req.session.user.roleId > 1) {
        res.redirect('/login');
        return;
    }
    next();
}


router.get('/login', ctrlUsers.getLogin);
router.post('/login', ctrlUsers.postLogin);

router.get('/reg', ctrlUsers.getReg);
router.post('/reg', ctrlUsers.postReg);

router.get('/', checkLogin);
router.get('/', ctrlProducts.getProductsList);

router.get('/', checkLogin);
router.get('/kinds/:kindId', ctrlProducts.getProductsListByKindId);

router.get('/products/:productId', ctrlProducts.getProductOne);

router.get('/shoppingCards', checkLogin);
router.get('/shoppingCards', ctrlShoppingCards.getShoppingCardsList);
router.post('/shoppingCards', checkLogin);
router.post('/shoppingCards', ctrlShoppingCards.createShoppingCardOne);

router.get('/ordersTmp', checkLogin);
router.post('/ordersTmp', ctrlOrder.createOrderOneTmp2);
router.get('/orders', checkLogin);
router.post('/orders', ctrlOrder.createOrderOne);

//router.post('/products/:productId', ctrlShoppingCards.createShoppingCardOne);
/*
 //购物车
 router.get('/users/:userId/shoppingCards', ctrlShoppingCards.getShoppingCardsList);
 router.post('/users/:userId/shoppingCards', ctrlShoppingCards.createShoppingCardOne);
 router.get('/users/:userId/shoppingCards/:shoppingCardId', ctrlShoppingCards.getShoppingCardOne);
 router.put('/users/:userId/shoppingCards/:shoppingCardId', ctrlShoppingCards.updateShoppingCardOne);
 router.delete('/users/:userId/shoppingCards/:shoppingCardId', ctrlShoppingCards.deleteShoppingCardOne);

 //订单
 router.get('/users/:userId/orders', ctrlOrder.getOrdersList);
 router.post('/users/:userId/orders', ctrlOrder.createOrderOne);
 router.get('/users/:userId/orders/:orderId', ctrlOrder.getOrderOne);
 router.put('/users/:userId/orders/:orderId', ctrlOrder.updateOrderOne);
 router.delete('/users/:userId/orders/:orderId', ctrlOrder.deleteOrderOne);

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
 */

module.exports = router;
