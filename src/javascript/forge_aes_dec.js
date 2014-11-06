/*
IV: 6b3087204c418d479b6cc33a02831729
AES Key: 7a51d064a1a216a692f753fcdab276e4
 */
var forge = require('node-forge');
var aeskey_hex = "7a51d064a1a216a692f753fcdab276e4";
var fs = require('fs');
var file = fs.readFileSync('data/ciphertext');
var aeskey = forge.util.hexToBytes(aeskey_hex);
var cipher = forge.cipher.createDecipher('AES-CBC', aeskey);
var iv = file.toString('binary', 0, 16);
var iv_buffer = forge.util.createBuffer(iv);
console.log(iv_buffer.toHex());
cipher.start({iv: iv});
var ciphertext = file.toString('binary', 16);
cipher.update(forge.util.createBuffer(ciphertext));
cipher.finish(function() {
	console.log('Decrypt finished.');
	return true;
});

var output = cipher.output;
var padding_length = output.last();
var plaintext = output.truncate(padding_length);
console.log(plaintext.toString());
console.log(plaintext.toHex());
