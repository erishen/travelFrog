/**
 * Created by lei_sun on 2017/12/5.
 */
var util = require('./util');
var config = require('./config');
var moment = require('../lib/moment-with-locales.min');

var openAVFlag = config.openAVFlag;

var leancloud = {};
leancloud.init = function(){
    // localStorage.setItem('debug', 'leancloud*');

    var APP_ID = util.decodeMyStr('/%Inunlxd$J%kp&@&jeHvXFM4YFyFQxMF');
    var APP_KEY = util.decodeMyStr('syywsm-&RrwX&b$u-N?JsnZK');

    openAVFlag && AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
};
leancloud.getObject = function(name){
    if(openAVFlag)
    {
        var Object = AV.Object.extend(name);
        var object = new Object();
        return object;
    }
    else
        return null;
};
leancloud.getQuery = function(name){
    if(openAVFlag)
    {
        var query = new AV.Query(name);
        return query;
    }
    else
        return null;
};
leancloud.saveInkeObject = function(object, parameters){
    if(object){
        object.save(parameters).then(function(object) {
            console.log('object_afterSave', object);
        });
    }
};
leancloud.updateInkeObject = function(query, object, parameters){
    var self = this;
    var inkeLiveID = parameters.inkeLiveID;
    var status = parameters.status;
    var watchSeconds = parameters.watchSeconds;

    console.log('updateInkeObject', inkeLiveID, status, watchSeconds);
    parameters.today = moment().format('YYYY-MM-DD');
    parameters.userAgent = window.navigator.userAgent;

    if(query){
        query.equalTo('inkeLiveID', inkeLiveID);
        query.find().then(function (results) {
            console.log('query_results', results);
            if(results && results.length == 0)
            {
                self.saveInkeObject(object, parameters);
            }
            else
            {
                var firstObj = results[0];
                var oldWatchSeconds = firstObj.get('watchSeconds');
                if(oldWatchSeconds)
                    firstObj.set('watchSeconds', oldWatchSeconds + watchSeconds);
                else
                    firstObj.set('watchSeconds', watchSeconds);

                firstObj.set('status', status);
                firstObj.save();
            }
        }, function (error) {
            console.log('query_error', error);
        });
    }
};

module.exports = leancloud;