/*Created By Jsir on 2018/5/8*/
'use strict'
const qiniu = require('qiniu-js');
const utils = {}
utils.timeFormat = function (type,ms) {
    var time;
    if (ms) {
        time = new Date(ms);
    } else {
        time = new Date();
    }
    let mouth = time.getMonth() + 1;
    let day = time.getDate();
    if (mouth < 10) {
        mouth = '0' + mouth
    } else {
        mouth = mouth;
    }
    if (day < 10) {
        day = '0' + day
    } else {
        day = day
    }
    return time.getFullYear() + type + mouth + type + day;
}
utils.uploadImages = function (file,filename,token,putExtra,config,observer) {
    var file = file;
    var key = filename;
    var token = token;
    var putExtra = putExtra;
    var config = config;
    var observer = observer;
    var observable = qiniu.upload(file, key, token, putExtra, config);
    var subscription = observable.subscribe(observer);
}
module.exports = utils;