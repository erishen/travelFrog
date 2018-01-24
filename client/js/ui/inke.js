/**
 * Created by lei_sun on 2017/12/5.
 */
var $ = require('../lib/jquery-3.2.1.min');
var _ = require('../lib/lodash.min');
var leancloud = require('../helper/leancloud');

var STORAGE_INKE_LIVEID_KEY = 'STORAGE_INKE_LIVEID_KEY';
var STORAGE_INKE_PLAYBEGIN_TIME_KEY = 'STORAGE_INKE_PLAYBEGIN_TIME_KEY';

var inke = {};
inke.name = 'Inke';
inke.logUserAction = function(parameters, player){
    var self = this;
    var inkeName = self.name;
    console.log('logUserAction', parameters);

    leancloud.init();
    var inkeObject = leancloud.getObject(inkeName);
    var inkeQuery = leancloud.getQuery(inkeName);

    var inkeType = parameters.inkeType;
    var inkeLiveID = parameters.inkeLiveID;
    var inkeUserID = parameters.inkeUserID;

    parameters.hostname = window.location.hostname;

    if(inkeType == undefined){
        if(inkeLiveID != undefined){
            parameters.href = window.location.origin + window.location.pathname + '?L=' + inkeLiveID;

            if(inkeUserID != undefined)
                parameters.href += '&U=' + inkeUserID;
        }
    }
    else if(inkeType == 'Video'){
        if(inkeLiveID != undefined)
            parameters.href = window.location.origin + window.location.pathname + '?I=' + inkeLiveID;

        STORAGE_INKE_LIVEID_KEY = 'STORAGE_VIDEO_LIVEID_KEY';
        STORAGE_INKE_PLAYBEGIN_TIME_KEY = 'STORAGE_VIDEO_PLAYBEGIN_TIME_KEY';
    }

    // 获取观看秒数
    var getWatchSeconds = function(){
        var watchSeconds = 0;
        var storageInkePlayBeginTime = window.localStorage.getItem(STORAGE_INKE_PLAYBEGIN_TIME_KEY);
        console.log('storageInkePlayBeginTime', storageInkePlayBeginTime);
        if(storageInkePlayBeginTime != null && storageInkePlayBeginTime != 0)
        {
            window.localStorage.setItem(STORAGE_INKE_PLAYBEGIN_TIME_KEY, 0);
            watchSeconds = parseInt(((new Date()).getTime() - storageInkePlayBeginTime) / 1000, 10);
        }
        console.log('watchSeconds', watchSeconds);
        return watchSeconds;
    };

    // 开始播放视频
    var playVideo = function(){
        var storageInkeLiveID = window.localStorage.getItem(STORAGE_INKE_LIVEID_KEY);
        console.log('playVideo_storageInkeLiveID', storageInkeLiveID, inkeLiveID, parameters);

        if(storageInkeLiveID == null || storageInkeLiveID == 0 || storageInkeLiveID != inkeLiveID)
        {
            window.localStorage.setItem(STORAGE_INKE_LIVEID_KEY, inkeLiveID);
        }
        window.localStorage.setItem(STORAGE_INKE_PLAYBEGIN_TIME_KEY, (new Date()).getTime());

        var obj = _.cloneDeep(parameters);
        obj.watchSeconds = 0;
        obj.status = 'play';
        leancloud.updateInkeObject(inkeQuery, inkeObject, obj);
    };

    // 暂停播放视频
    var pauseVideo = function(){
        var storageInkeLiveID = window.localStorage.getItem(STORAGE_INKE_LIVEID_KEY);
        console.log('pauseVideo_storageInkeLiveID', storageInkeLiveID, inkeLiveID, parameters);

        var obj = _.cloneDeep(parameters);
        if(storageInkeLiveID == inkeLiveID)
        {
            obj.watchSeconds = getWatchSeconds();
        }

        obj.status = 'pause';
        leancloud.updateInkeObject(inkeQuery, inkeObject, obj);
    };

    // 重新加载视频
    var reloadVideo = function(){
        var storageInkeLiveID = window.localStorage.getItem(STORAGE_INKE_LIVEID_KEY);
        console.log('reloadVideo_storageInkeLiveID', storageInkeLiveID, inkeLiveID);

        if(storageInkeLiveID != null && storageInkeLiveID != 0 && storageInkeLiveID != inkeLiveID) {
            window.localStorage.setItem(STORAGE_INKE_LIVEID_KEY, 0);
            var obj = _.cloneDeep(parameters);
            obj.watchSeconds = getWatchSeconds();
            obj.inkeLiveID = storageInkeLiveID;
            obj.status = 'pause';
            leancloud.updateInkeObject(inkeQuery, inkeObject, obj);
        }
    };

    var currentState = 'start';

    if(player){
        player.onPlayState(3, function(){
            currentState = 'ended';
            console.log('player_ended');
            pauseVideo();
        });
    }

    var oldStateBeforeLeave = '';
    // 监听页面可见
    document.addEventListener("visibilitychange", function(){
        console.log('currentState', currentState, document.hidden);

        if(document.hidden) { // 用户离开了
            oldStateBeforeLeave = currentState;
            if(currentState == 'play')
            {
                $('.js_player').show();
                player.pause();
                currentState = 'pause';
                pauseVideo();
            }
        }
        else { // 用户回来了
            if(oldStateBeforeLeave == 'play')
            {
                $('.js_player').hide();
                player.play();
                currentState = 'play';
                playVideo();
            }
        }
    });

    var playClickFlag = false;
    var firstClickFlag = false;

    $('.js_player').on('click', function () {
        firstClickFlag = true;
        playClickFlag = true;

        currentState = 'play';
        playVideo();

        setTimeout(function () {
            playClickFlag = false;
        }, 100);
    });

    $('.js_player_cover').on('click', function () {
        if (firstClickFlag && !playClickFlag) {
            currentState = 'pause';
            pauseVideo();
        }
    });

    $('.js_reload').on('click', function () {
        console.log('reload');

        if(currentState == 'play')
            reloadVideo();
    });

    $(document).ready(function(){
        console.log('ready');
        reloadVideo();
    });
};
module.exports = inke;