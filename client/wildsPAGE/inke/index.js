/**
 * Created by lei_sun on 2017/11/27.
 */
require("./index.less");

var $ = require('../../js/lib/jquery-3.2.1.min');
var _ = require('../../js/lib/lodash.min');
var moment = require('../../js/lib/moment-with-locales.min');
var videoUI = require('../../js/ui/video');
var util = require('../../js/helper/util');
var inkeService = require('../../js/service/inke');
var inkeUI = require('../../js/ui/inke');

var videoId = 'my_video_1';
var playerUrl = 'http://vjs.zencdn.net/v/oceans.mp4';
var coverImageUrl = '/wildsASSET/oceans.png';

// URL 参数设置: R = Random
var urlObj = util.getUrlObj(window.location.search);

var inkeLiveID = 0;
var inkeUserID = 0;
var isRandom = false;

if(urlObj){
    if(urlObj.R != undefined)
        isRandom = true;

    if(urlObj.L != undefined)
        inkeLiveID = urlObj.L;

    if(urlObj.U != undefined)
        inkeUserID = urlObj.U;
}

getLiveHotList();

// 获取热门直播列表
function getLiveHotList(){

    if(inkeLiveID != 0 && inkeUserID != 0) {
        getLiveAddr(inkeLiveID, inkeUserID);
    }
    else {
        inkeService.getLiveHotList(function(data){
            console.log('getLiveHotList_data', data);

            var dataLen = data.length;
            if(data && dataLen > 0)
            {
                data = _.orderBy(data, ['online_users'], ['desc']);

                var index = 0;
                if(isRandom)
                {
                    index = util.getRandomNum(0, dataLen - 1);
                }

                var liveObj = data[index];
                console.log('liveObj', index, liveObj);

                var liveid = liveObj.liveid;
                var uid = liveObj.uid;
                var city = liveObj.city;
                var nick = liveObj.nick;
                var name = liveObj.name;
                var gender = liveObj.gender;
                var level = liveObj.level;
                var portrait = liveObj.portrait;
                var online_users = liveObj.online_users;
                var image2 = liveObj.image2;

                var titleArr = [];
                titleArr.push(index + '.');

                if(name != '')
                    titleArr.push(name);
                else if(nick != '')
                    titleArr.push(nick);

                if(city != '')
                    titleArr.push('(' + city + ')');

                var title = titleArr.join('');
                document.title = title;
                getLiveAddr(liveid, uid, {
                    index: index,
                    title: title,
                    name: name,
                    nick: nick,
                    city: city,
                    gender: (gender === 0) ? '女' : '男',
                    level: level,
                    smallImg: portrait,
                    bigImg: image2,
                    onlineUsers: online_users
                });
            }
        });
    }
}

// 获取直播流地址
function getLiveAddr(liveid, uid, options){
    console.log('getLiveAddr', liveid, uid, options);
    inkeService.getLiveAddr(liveid, uid, function (data) {
        console.log('getLiveAddr_data', data);
        coverImageUrl = data.cover_img;
        playerUrl = data.file[0];
        var player = videoUI.init(videoId, coverImageUrl, playerUrl);

        if(options == undefined)
            options = {};

        options.inkeLiveID = liveid.toString();
        options.inkeUserID = uid.toString();

        inkeUI.logUserAction(options, player);
    });
}