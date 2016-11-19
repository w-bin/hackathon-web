var express = require('express');
var router = express.Router();
var ctrUser = require('../controllers/ctrlUser');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', ctrUser.getLogin);
//router.post('/login', ctrUser.postLogin);

router.get('/reg', ctrUser.getReg);
router.post('/reg', ctrUser.postReg);

module.exports = router;
