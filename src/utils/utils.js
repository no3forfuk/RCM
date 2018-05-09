/*Created By Jsir on 2018/5/8*/
'use strict'
const utils = {}
utils.timeFormat = function (type) {
    let time = new Date();
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
module.exports = utils;