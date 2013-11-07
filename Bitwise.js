(function (global) {
  'use strict';

  function _pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  function _toHex(n) {
    return _pad(n.toString(16), 2)
  }

  global.Bitwise = {
    encode: function (n) {
      var hi, lo;
      n  = (n + 0x2000) << 1; // left shift 1 bit to clear msb
      lo = (n & 0x00ff) >> 1; // pack the lo byte
      hi = (n & 0xff00) >> 8; // pack the hi byte
      return _toHex(hi) + _toHex(lo); // combine encoded values as hex string
    },

    decode: function (hi, lo, n) {
      hi = hi << 8; // unpack the hi byte
      lo = lo << 1; // unpack the lo byte
      n  = (hi | lo) >> 1; // glue hi & lo back together & right shift everything
      return n - 0x2000; // return range to original position
    }
  }

}(typeof module !== 'undefined' ? module.exports : window));
  
