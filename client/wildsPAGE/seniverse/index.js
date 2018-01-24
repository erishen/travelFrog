/**
 * Created by lei_sun on 2017/11/29.
 */
import './index.less';
import $ from '../../js/lib/jquery-3.2.1.min';
import _ from '../../js/lib/lodash.min';
import util from '../../js/helper/util';
import seniverseService from '../../js/service/seniverse';

var location = "上海";

// URL 参数设置: L = location
var urlObj = util.getUrlObj(window.location.search);

if(urlObj){
    if(urlObj.L != undefined)
        location = urlObj.L;
}

window.getWeatherNowJSONP = function(data){
    console.log('getWeatherNowJSONP_data', data);
    if(data){
        var obj = document.getElementById('weather_now');
        var weather = data.results[0];

        var text = [];
        text.push("位置: " + weather.location.path);
        text.push("天气: " + weather.now.text);
        text.push("温度: " + weather.now.temperature);
        text.push('\n');

        obj.innerText = text.join("\n");
    }
};

seniverseService.getWeatherNowJSONP(location, 'getWeatherNowJSONP');

window.getWeatherDailyJSONP = function(data){
    console.log('getWeatherDailyJSONP_data', data);
    if(data) {
        var obj = document.getElementById('weather_daily');
        var weather = data.results[0];
        var dailyArr = weather.daily;
        var dailyArrLen = dailyArr.length;
        var text = [];

        for(var i = 0; i < dailyArrLen; i++){
            var dailyObj = dailyArr[i];

            text.push("日期: " + dailyObj.date);
            text.push("最高温度: " + dailyObj.high);
            text.push("最低温度: " + dailyObj.low);
            text.push("白天天气: " + dailyObj.text_day);
            text.push("晚上天气: " + dailyObj.text_night);
            text.push("风向: " + dailyObj.wind_direction);
            text.push("风向角度: " + dailyObj.wind_direction_degree + '度');
            text.push("风速: " + dailyObj.wind_speed + 'km/h');
            text.push("风力等级: " + dailyObj.wind_scale + '级');
            text.push('\n');
        }
        obj.innerText = text.join("\n");
    }
};

seniverseService.getWeatherDailyJSONP(location, 'getWeatherDailyJSONP');

window.getLifeSuggestionJSONP = function(data){
    console.log('getLifeSuggestionJSONP_data', data);
    if(data) {
        var obj = document.getElementById('life_suggestion');
        var weather = data.results[0];
        var suggestion = weather.suggestion;
        var car_washing = suggestion.car_washing;
        var dressing = suggestion.dressing;
        var flu = suggestion.flu;
        var sport = suggestion.sport;
        var travel = suggestion.travel;
        var uv = suggestion.uv;

        var text = [];
        text.push("洗车: " + car_washing.brief);
        text.push("穿衣: " + dressing.brief);
        text.push("感冒: " + flu.brief);
        text.push("运动: " + sport.brief);
        text.push("旅游: " + travel.brief);
        text.push("紫外线: " + uv.brief);
        text.push('\n');

        obj.innerText = text.join("\n");
    }
};

seniverseService.getLifeSuggestionJSONP(location, 'getLifeSuggestionJSONP');

/* 直接接口调用 github 站点有跨域问题，所以采用上述 JSONP 方式调用
seniverseService.getWeatherNow(location, function(data){
    console.log('getWeatherNow_data', data);
    if(data){
        var obj = document.getElementById('weather_now');
        var weather = data.results[0];

        var text = [];
        text.push("位置: " + weather.location.path);
        text.push("天气: " + weather.now.text);
        text.push("温度: " + weather.now.temperature);
        text.push('\n');

        obj.innerText = text.join("\n");
    }
});

seniverseService.getWeatherDaily(location, function(data){
    console.log('getWeatherDaily_data', data);
    if(data) {
        var obj = document.getElementById('weather_daily');
        var weather = data.results[0];
        var dailyArr = weather.daily;
        var dailyArrLen = dailyArr.length;
        var text = [];

        for(var i = 0; i < dailyArrLen; i++){
            var dailyObj = dailyArr[i];

            text.push("日期: " + dailyObj.date);
            text.push("最高温度: " + dailyObj.high);
            text.push("最低温度: " + dailyObj.low);
            text.push("白天天气: " + dailyObj.text_day);
            text.push("晚上天气: " + dailyObj.text_night);
            text.push("风向: " + dailyObj.wind_direction);
            text.push("风向角度: " + dailyObj.wind_direction_degree + '度');
            text.push("风速: " + dailyObj.wind_speed + 'km/h');
            text.push("风力等级: " + dailyObj.wind_scale + '级');
            text.push('\n');
        }
        obj.innerText = text.join("\n");
    }
});

seniverseService.getLifeSuggestion(location, function(data){
    console.log('getLifeSuggestion_data', data);
    if(data) {
        var obj = document.getElementById('life_suggestion');
        var weather = data.results[0];
        var suggestion = weather.suggestion;
        var car_washing = suggestion.car_washing;
        var dressing = suggestion.dressing;
        var flu = suggestion.flu;
        var sport = suggestion.sport;
        var travel = suggestion.travel;
        var uv = suggestion.uv;

        var text = [];
        text.push("洗车: " + car_washing.brief);
        text.push("穿衣: " + dressing.brief);
        text.push("感冒: " + flu.brief);
        text.push("运动: " + sport.brief);
        text.push("旅游: " + travel.brief);
        text.push("紫外线: " + uv.brief);
        text.push('\n');
        
        obj.innerText = text.join("\n");
    }
});
*/