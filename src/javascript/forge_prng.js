/*
phpseclib/phpseclib suggests installing ext-mcrypt (Install the Mcrypt extension in order to speed up a wide variety of cryptographic operations.)
phpseclib/phpseclib suggests installing ext-gmp (Install the GMP (GNU Multiple Precision) extension in order to speed up arbitrary precision integer arithmetic operations.)
phpseclib/phpseclib suggests installing pear-pear/PHP_Compat (Install PHP_Compat to get phpseclib working on PHP < 4.3.3.)
*/
var forge = require('node-forge');

// get some random bytes synchronously 
/*
var bytes = forge.random.getBytesSync(32);
console.log(forge.util.bytesToHex(bytes));
*/ 

// collect some entropy if you'd like 
var someRandomBytes = forge.util.hexToBytes("000102030405060708090A0B0C0D0E0F");
forge.random.collect(someRandomBytes);

// get some random bytes asynchronously 
forge.random.getBytes(32, function(err, bytes) {
  console.log(forge.util.bytesToHex(bytes));
});

var myPrng = forge.random.createInstance();

// specify a seed file for use with the synchronous API if you'd like
myPrng.seedFileSync = function(needed) {
  console.log('get needed number of random bytes from somewhere: ' + needed);
  var fetchedRandomBytes = forge.util.hexToBytes("000102030405060708090A0B0C0D0E0F");
  // get 'needed' number of random bytes from somewhere
  return fetchedRandomBytes;
};

// get some random bytes asynchronously 
myPrng.getBytes(32, function(err, bytes) {
  console.log(forge.util.bytesToHex(bytes));
});
