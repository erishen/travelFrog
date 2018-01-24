/**
 * Created by lei_sun on 2018/1/12.
 */
var express = require('express'),
    router = express.Router();
var version = require('../config/version');

router.get('/', function(req, res) {
    res.render('react', { version: version });
});

module.exports = router;