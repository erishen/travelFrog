/**
 * Created by lei_sun on 2017/11/28.
 */
var $ = require('../lib/jquery-3.2.1.min');
var _ = require('../lib/lodash.min');

var playBtnFlag = false;
var playClickFlag = false;
var firstClickFlag = false;
var video = {};
video.init = function(id, coverImageUrl, playerUrl){
    var self = this;

    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    console.log('init', screenWidth, screenHeight);

    $('.video-wrap').css({ 'width': screenWidth, 'height': screenHeight });
    $('.video-js').css({ 'width': screenWidth, 'height': screenHeight });
    $('.vjs-tech').css({ 'width': screenWidth, 'height': screenHeight });

    var player = self.neplayerSetting(id, playerUrl);
    self.eventListener(player);

    self.setCoverImageUrl(coverImageUrl);

    $('.wildskick-video').show();
    return player;
};
video.setCoverImageUrl = function(coverImageUrl){
    if(coverImageUrl != '')
    {
        $('.vjs-poster').css({
            'background-image': 'url(' + coverImageUrl + ')',
            'display': 'block'
        });
        $('.vjs-poster').removeClass('vjs-hidden');
    }
};
video.setPlayerUrl = function(player, playerUrl) {
    if (playerUrl != '') {
        var lowUrl = playerUrl.toLowerCase();
        var urlType = lowUrl.substring(0, 4);
        var type = '';

        switch (urlType) {
            case 'http':
                if (lowUrl.indexOf('mp4') !== -1) {
                    type = "video/mp4";
                } else if (lowUrl.indexOf('mov') !== -1) {
                    type = "video/mp4";
                } else if (lowUrl.indexOf('flv') !== -1) {
                    type = "video/x-flv";
                } else if (lowUrl.indexOf('m3u8') !== -1) {
                    type = "application/x-mpegURL";
                }
                break;
            case 'rtmp':
                type = "rtmp/flv";
                break;
        }

        if (type != '' && player) {
            player.setDataSource({type: type, src: playerUrl});
        }
    }
};
video.neplayerSetting = function(id, playerUrl){
    console.log('neplayerSetting', id, playerUrl);
    var self = this;
    // 播放器设置参数
    var playerOptions = {
        inactivityTimeout: 0,
        bigPlayButton: false,
        controls: false,
        controlBar: {
            nativeControlsForTouch: false,
            children: [
                { name: "currentTimeDisplay" },
                { name: "progressControl" },
                { name: "durationDisplay" }
            ],
            currentTimeDisplay: true,
            progressControl: true,
            durationDisplay: true
        }
    };

    // 使用 neplayer 视频播放器初始化
    var player = null;
    if (neplayer)
    {
        player = neplayer(id, playerOptions, function () {
            $('.vjs-play-control').css('display', 'none');
            $('.vjs-volume-menu-button').css('display', 'none');
            $('.vjs-fullscreen-control').css('display', 'none');
            $('.vjs-big-play-button').css('display', 'none');
        });

        self.setPlayerUrl(player, playerUrl);

        player.on('loadstart', function () {
            console.log('loadstart', player.getVideoWidth(), player.getVideoHeight());
        });

        player.on('progress', function () {
            //console.log('progress', player.getVideoWidth(), player.getVideoHeight());
        });

        player.on('canplay', function () {
            //console.log('canplay', player.getVideoWidth(), player.getVideoHeight());

            if(!playBtnFlag)
            {
                $('.js_player').show();
                playBtnFlag = true;
            }
        });

        player.on("playing", function () {
            //console.log("playing");
        });

        player.on('ended', function(){
            $('.js_player').show();
            $('.js_header').css('display', 'flex');
            $('.js_operation').css('display', 'flex');
        });

        player.on('error', function () {
            //console.log('error');
            $(".reload-sbg").css("height", $(window).height());
            $(".reload-sbg").show();
            $('.js_player').hide();
        });

        self.videojsSetting(id);
    }

    return player;
};
video.videojsSetting = function(id){
    // 使用 videojs 设置 Video 样式
    var playerVideo = null;
    if (videojs)
    {
        playerVideo = videojs(id);
        playerVideo.addClass('vjs-matrix');
    }
    return playerVideo;
};
video.play = function(player){
    var self = this;
    firstClickFlag = true;
    playClickFlag = true;
    console.log('play');

    $('.js_player').hide();
    $('.js_operation').hide();
    $('.js_header').hide();

    // iOS QQ 浏览器 特殊处理 （问题：Video 会藏在 body 后面）
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent) && /mqqbrowser/.test(userAgent)) {
        $("body").css('background-color', 'transparent');
        $(".video-content").hide();
    }

    if(player)
        player.play();

    playBtnFlag = true;
    $('.vjs-poster').addClass('vjs-hidden');

    setTimeout(function () {
        playClickFlag = false;
    }, 100);
};
video.pause = function(player){
    var self = this;
    if (firstClickFlag && !playClickFlag) {
        console.log('pause');

        $('.js_player').show();
        $('.js_header').css('display', 'flex');
        $('.js_operation').css('display', 'flex');

        if(player)
            player.pause();

        playBtnFlag = false;
    }
};
video.eventListener = function(player) {
    var self = this;

    $('.js_player_cover').on('click', function () {
        self.pause(player);
    });

    $('.js_player').on('click', function () {
        self.play(player);
    });

    $('.js_reload').on('click', function () {
        window.location.reload();
    });
};

module.exports = video;