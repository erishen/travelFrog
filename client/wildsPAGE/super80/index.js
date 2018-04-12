import './index.less';

var _ = require('../../js/lib/lodash.min');
var util = require('../../js/helper/util');

var SUPER80_SEARCHTXTS = 'SUPER80_SEARCHTXTS';

var getSearchTxts = function () {
    var searchTxts = JSON.parse(window.localStorage.getItem(SUPER80_SEARCHTXTS), true) || [];
    return searchTxts;
};

var setSearchTxts = function(searchTxts){
    window.localStorage.setItem(SUPER80_SEARCHTXTS, JSON.stringify(searchTxts));
};

// flag => 是否全部添加数据
var appendItems = function(searchTxts, searchIndex, flag){
    var content = [];
    _.each(searchTxts, function(searchTxt, index){
        var hrefTxt = searchTxt;
        if(searchTxt.indexOf('http') == -1)
            hrefTxt = 'http://' + searchTxt;

        var itemTxt = '<a href="' + hrefTxt + '" target="_blank">' + searchTxt + '</a>';
        itemTxt += '<button class="item-del-btn js_itemDelBtn">删除</button>';
        var itemIndex = searchIndex + index;
        content.push('<div class="item js_item" id="item_' + itemIndex + '">' + itemTxt + '</div>');
    });
    $('.js_list').append(content.join(''));

    var mouseoverItem = function(event){
        var itemId = event.currentTarget.id;
        console.log('mouseoverItem', itemId);
        $('#' + itemId + ' .item-del-btn').show();
    };

    var mouseoutItem = function(event){
        var itemId = event.currentTarget.id;
        console.log('mouseoutItem', itemId);
        $('#' + itemId + ' .item-del-btn').hide();
    };

    var touchTimeout = null;
    var touchstartItem = function(event){
        event.stopPropagation();
        var itemId = event.currentTarget.id;
        var touchEvent = event;
        console.log('touchstartItem', itemId);
        touchTimeout = setTimeout(function(){
            mouseoverItem(touchEvent);
        }, 1000);
    };

    var touchendItem = function(event){
        event.stopPropagation();
        var itemId = event.currentTarget.id;
        console.log('touchendItem', itemId);
        if(touchTimeout != null)
        {
            clearTimeout(touchTimeout);
            touchTimeout = null;
        }
    };

    var doDel = function(event){
        var itemId = $(event.target).parent()[0].id;
        var searchTxtDel = $('#' + itemId + ' a').html();
        $('#' + itemId).remove();
        $('.js_searchTxt').focus();

        var newSearchTxts = [];
        var searchTxts = getSearchTxts();
        _.each(searchTxts, function(searchTxt, index){
            if(searchTxt != searchTxtDel)
                newSearchTxts.push(searchTxt);
        });
        setSearchTxts(newSearchTxts);
    };

    if(flag){
        $('.js_item').on('mouseover', mouseoverItem);
        $('.js_item').on('mouseout', mouseoutItem);
        $('.js_itemDelBtn').on('click', doDel);

        $('.js_item').on('touchstart', touchstartItem);
        $('.js_item').on('touchend', touchendItem);
    }
    else {
        $('#item_' + searchIndex).on('mouseover', mouseoverItem);
        $('#item_' + searchIndex).on('mouseout', mouseoutItem);
        $('#item_' + searchIndex + ' .js_itemDelBtn').on('click', doDel);

        $('#item_' + searchIndex).on('touchstart', touchstartItem);
        $('#item_' + searchIndex).on('touchend', touchendItem);
    }

    $('.js_center').on('touchstart', function(){
        event.stopPropagation();
        console.log('centerTouchstart');
        $('.item-del-btn').hide();
    });
};

var doSearch = function(){
    var searchTxt = $('.js_searchTxt').val();
    // TODO:: 防止 XSS 攻击
    if(util.trim(searchTxt) == '')
        return;

    var searchTxts = getSearchTxts();
    searchTxts.push(searchTxt);

    $('.js_searchTxt').val('').focus();
    appendItems([searchTxt], searchTxts.length - 1, false);

    setSearchTxts(searchTxts);
};

$().ready(function(){
    //setSearchTxts([]);
    var searchTxts = getSearchTxts();
    appendItems(searchTxts, 0, true);

    $('.js_searchBtn').on('click', doSearch);

    $('.js_searchTxt').on('keyup', function(){
       if(event.keyCode == 13){
           doSearch();
       }
    });
});


