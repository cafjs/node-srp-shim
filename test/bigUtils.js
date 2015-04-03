
var  BigInteger = require('jsbn');

/*
 * From https://github.com/justmoon/node-bignum.git
 *
 * license": "MIT/X11"
 *
 * "author": {
 *   "name": "Stefan Thomas",
 *   "email": "justmoon@members.fsf.org",
 *   "url": "http://www.justmoon.net"
 * }
 */
var toBuffer = exports.toBuffer = function(x) {
    var hex = x.toString(16);
    if (hex.charAt(0) === '-') throw new Error(
        'converting negative numbers to Buffers not supported yet'
    );
    var len = Math.ceil(hex.length / 2 );
    var buf = new Buffer(len);
    // zero-pad the hex string so the chunks are all `size` long
    while (hex.length < 2 * len) hex = '0' + hex;
    var hx = hex
        .split(new RegExp('(.{2})'))
        .filter(function (s) { return s.length > 0; });

    hx.forEach(function (chunk, i) {
                   buf[i] = parseInt(chunk.slice(0,2), 16);
               });
    return buf;
};


var fromBuffer = exports.fromBuffer = function(buf) {
    var hex = [];
    for (var i = 0; i < buf.length; i += 1) {
        hex.push(function (c) {
                     return (c < 16 ? '0' : '') + c.toString(16);
                 }(buf[i]));
    }
    return new BigInteger(hex.join(''), 16);
};
