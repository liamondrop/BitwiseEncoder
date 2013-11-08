(function (exports) {
  'use strict';

  var trans  = 0x2000, // 8192 : used to translate the range to non-negative land
      lomask = 0x00ff, // 0000000011111111
      himask = 0xff00; // 1111111100000000

  function _pad(n, width) {
    n = n + '';
    while (n.length < width)
      n = '0' + n;
    return n;
  }

  function _toHex(n) {
    return _pad(n.toString(16), 2)
  }

  exports.Bitwise = {
    /**
     * encode
     * accepts a value and returns an encoded hex string
     * n: an integer (base 10) in the range [-8192 .. 8191]
     */
    encode: function (n) {
      n = (n + trans) << 1;           // translate the range to zero & left shift 1 bit to clear msb
      var lo = (n & lomask) >> 1;     // lo byte
      var hi = (n & himask) >> 8;     // hi byte
      return _toHex(hi) + _toHex(lo); // return encoded values as hex string
    },

    /**
     * decode
     * accepts a pair of hex values and returns a decoded integer
     * hi, lo: integers (base 16) formatted as [0x00 .. 0x7f]
     * n: pointer
     */
    decode: function (hi, lo, n) {
      hi = hi << 8;       // unpack the hi byte
      lo = lo << 1;       // unpack the lo byte
      n = (hi | lo) >> 1; // hi & lo combined & right shifted
      return n - trans;   // return range to original position
    }
  };

}(typeof module !== 'undefined' ? module.exports : window));
  
