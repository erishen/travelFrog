var express = require('express'),
    router = express.Router();
var version = require('../config/version');

router.get('/', function(req, res) {
    res.render('crm', { version: version });
});

module.exports = router;