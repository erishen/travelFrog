/**
 * Created by lei_sun on 2017/11/29.
 */
var util = require('../helper/util');

var PREFIX = "http://api.seniverse.com/v3/";
var WEATHER_NOW_API = PREFIX + "weather/now.json"; // 获取天气实况
var WEATHER_DAILY_API = PREFIX + "weather/daily.json"; // 逐日天气预报和昨日天气
var LIFE_SUGGESTION_API = PREFIX + "life/suggestion.json"; // 生活指数

var seniverse = {};
seniverse.getSecuritySig = function(){
    var UID = "UCC54709D1";
    var KEY = util.decodeMyStr("XPV-PZ/QH-LMbUQW");

    // 获取当前时间戳
    var ts = Math.floor((new Date()).getTime() / 1000);

    // 构造验证参数字符串
    var str = "ts=" + ts + "&uid=" + UID;

    // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
    // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
    var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
    sig = encodeURIComponent(sig);
    str = str + "&sig=" + sig;
    return str;
};
seniverse.getWeatherNow = function(location, sucCallback, errCallback){
    var self = this;
    var securitySig = self.getSecuritySig();
    var url = WEATHER_NOW_API + "?location=" + location + "&" + securitySig;
    util.getJSON(url, sucCallback, errCallback);
};
seniverse.getWeatherNowJSONP = function(location, jsonpFunc){
    var self = this;
    var securitySig = self.getSecuritySig();
    var url = WEATHER_NOW_API + "?location=" + location + "&" + securitySig + "&callback=" + jsonpFunc;
    util.appendScript(url);
};
seniverse.getWeatherDaily = function(location, sucCallback, errCallback){
    var self = this;
    var securitySig = self.getSecuritySig();
    var url = WEATHER_DAILY_API + "?location=" + location + "&" + securitySig;
    util.getJSON(url, sucCallback, errCallback);
};
seniverse.getWeatherDailyJSONP = function(location, jsonpFunc){
    var self = this;
    var securitySig = self.getSecuritySig();
    var url = WEATHER_DAILY_API + "?location=" + location + "&" + securitySig + "&callback=" + jsonpFunc;
    util.appendScript(url);
};
seniverse.getLifeSuggestion = function(location, sucCallback, errCallback){
    var self = this;
    var securitySig = self.getSecuritySig();
    var url = LIFE_SUGGESTION_API + "?location=" + location + "&" + securitySig;
    util.getJSON(url, sucCallback, errCallback);
};
seniverse.getLifeSuggestionJSONP = function(location, jsonpFunc){
    var self = this;
    var securitySig = self.getSecuritySig();
    var url = LIFE_SUGGESTION_API + "?location=" + location + "&" + securitySig + "&callback=" + jsonpFunc;
    util.appendScript(url);
};
module.exports = seniverse;