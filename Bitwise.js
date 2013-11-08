(function (global) {
  'use strict';

  function _zeroPad(n, width) {
    n = n + '';
    while (n.length < width)
      n = '0' + n;
    return n;
  }

  function _toHexStr(n) {
    return _zeroPad(n.toString(16), 2)
  }

  var trans  = 8192,   // used to translate the range to non-negative land
      lomask = 0x00ff, // 0000000011111111 = 255
      himask = 0xff00; // 1111111100000000 = 65280

  // global exports for Node or browser
  global.Bitwise = (global.module || {}).exports = {
    /**
     * encode
     * accepts a value and returns an encoded hex string
     * n: an integer (base 10) in the range [-8192 .. 8191]
     */
    encode: function (n) {
      var hi, lo;
      n  = (n + trans)  << 1; // translate & left-shift 1 bit to clear msb
      hi = (n & himask) >> 8; // hi byte
      lo = (n & lomask) >> 1; // lo byte
      return _toHexStr(hi) + _toHexStr(lo);
    },

    /**
     * decode
     * accepts a pair of hex values and returns a decoded integer
     * hi, lo: integers (base 16) in the range [0x00 .. 0x7f]
     */
    decode: function (hi, lo) {
      hi = hi << 8; // unpack the hi byte
      lo = lo << 1; // unpack the lo byte
      return ((hi | lo) >> 1) - trans; // hi & lo unioned, right-shifted & returned to original position
    }
  };

}(this));
  
