/**
 * Created by lei_sun on 2017/12/1.
 */
var express = require('express'),
    router = express.Router();
var version = require('../config/version');

router.get('/', function(req, res) {
    res.render('inke', { version: version });
});

module.exports = router;