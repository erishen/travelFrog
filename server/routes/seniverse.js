/**
 * Created by lei_sun on 2017/11/29.
 */
var express = require('express'),
    router = express.Router();
var version = require('../config/version');

router.get('/', function(req, res) {
    res.render('seniverse', { version: version });
});

module.exports = router;