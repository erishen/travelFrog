/**
 * Created by lei_sun on 2018/1/4.
 */
var os = require('os');

var getIPAdress = function(){
    var interfaces = os.networkInterfaces();
    //console.log('interfaces', interfaces);
    for(var devName in interfaces){
        //console.log('devName', devName);
        if(devName.indexOf('VPN') == -1){
            var iface = interfaces[devName];
            for(var i=0;i<iface.length;i++){
                var alias = iface[i];
                if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                    return alias.address;
                }
            }
        }
    }
};

module.exports = {
    getIPAdress: getIPAdress
};