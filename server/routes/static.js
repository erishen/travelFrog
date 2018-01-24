/**
 * Created by lei_sun on 2017/12/1.
 */
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    router = express.Router();
var version = require('../config/version');
var systemService = require('../service/system');

var isDev = process.env.NODE_ENV !== 'production';

var firstUpper = function(str){
    var firstWord = str.substring(0, 1);
    return firstWord.toUpperCase() + str.substring(1);
};

var renderWrite = function(req, res, route, callback){
    res.render(route, { version: version, ip: systemService.getIPAdress() }, function(err, html){
        if(!err){
            var filename = '';
            if(route.indexOf('/') != -1){
                var routeArr = route.split('/');
                filename = firstUpper(routeArr[0]) + firstUpper(routeArr[1]);
            }
            else {
                filename = firstUpper(route);
            }

            if(filename != ''){
                fs.writeFile(path.join(__dirname, '../../public') + '/' + filename + '.html', html, 'utf8', (err) => {
                    if (!err) {
                        console.log('The file ' + filename + '.html has been saved!');
                        return callback && callback(true);
                    }
                    else {
                        return callback && callback(false);
                    }
                });
            }
            else {
                return callback && callback(false);
            }
        }
        else {
            return callback && callback(false);
        }
    });
};

var renderWriteLoop = function(req, res, routeIndex, routeArray, resultArray, callback){
    if(resultArray == undefined)
        resultArray = [];

    if(routeArray && routeArray.length > 0){
        var routeArrayLen = routeArray.length;
        if(routeIndex >= 0 && routeIndex < routeArrayLen){
            var route = routeArray[routeIndex];
            renderWrite(req, res, route, function(flag){
                //console.log('renderWriteLoop', route, flag);
                resultArray.push({ route: route, flag: flag });
                routeIndex++;
                return renderWriteLoop(req, res, routeIndex, routeArray, resultArray, callback);
            });
        }
        else {
            return callback && callback(resultArray);
        }
    }
    else {
        return callback && callback(resultArray);
    }
};

router.get('/', function(req, res) {
    if(!isDev) {
        var resultArray = [];
        var routeArray = ['inke', 'seniverse', 'react'];
        renderWriteLoop(req, res, 0, routeArray, resultArray, function(result){
            res.send(result);
        });
    }
    else {
        res.send('Should use production');
    }
});

module.exports = router;