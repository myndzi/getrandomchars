'use strict';
var Promise = require('bluebird'),
    ie = require('int-encoder'),
    crypto = require('crypto');

var alpha = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function getRandomChars(len, chars) {
    chars = chars || alpha;
    var deferred = Promise.defer();
    var bytes = Math.ceil(Math.log(chars.length)/Math.log(256)*len);

    crypto.randomBytes(bytes, function (ex, buf) {
        ie.alphabet(chars);
        var hex = buf.toString('hex'),
            num = ie.encode(hex, 16);
        
        // pad the beginning with zeroes in case of a low number
        while (num.length < len) {
            console.log(num);
            num = alpha[0]+num;
        }
        
        // cut off the MSB in case of a high number
        deferred.resolve(num.slice(-len));
    });
    return deferred.promise;
};
