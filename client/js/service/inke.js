/**
 * Created by lei_sun on 2017/12/1.
 */
var $ = require('../lib/jquery-3.2.1.min');
var _ = require('../lib/lodash.min');
var util = require('../helper/util');

var getJSON = function(url, sucCallback, errCallback){
    util.getJSON(url, function(result){
        var error_code = result.error_code;
        if(!error_code){
            return sucCallback && sucCallback(result.data);
        }
        return sucCallback && sucCallback(null);
    }, errCallback);
};

var inke = {};
inke.getLiveHotList = function(sucCallback, errCallback){
    var url = 'http://baseapi.busi.inke.cn/live/LiveHotList';
    getJSON(url, sucCallback, errCallback);
};
inke.getLiveAddr = function(liveid, uid, sucCallback, errCallback){
    var url = 'http://webapi.busi.inke.cn/mobile/Get_live_addr?liveid=' + liveid + '&uid=' + uid;
    getJSON(url, sucCallback, errCallback);
};
module.exports = inke;