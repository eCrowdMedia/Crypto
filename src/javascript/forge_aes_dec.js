/*
IV: 6b3087204c418d479b6cc33a02831729
AES Key: 7a51d064a1a216a692f753fcdab276e4
 */
var forge = require('node-forge');
// var aeskey_hex = "7a51d064a1a216a692f753fcdab276e4";
var aeskey_hex = "05a31251853547e8c14089d2ae941ea4";
var fs = require('fs');
// var file = fs.readFileSync('data/ciphertext');
var file = fs.readFileSync('data/Cover_encrypted.jpg');
var aeskey = forge.util.hexToBytes(aeskey_hex);
var decipher = forge.cipher.createDecipher('AES-CBC', aeskey);
var iv = file.toString('binary', 0, 16);
var iv_buffer = forge.util.createBuffer(iv);
console.log('IV in HEX: ' + iv_buffer.toHex());

decipher.start({iv: iv});
var ciphertext = file.toString('binary', 16);
var ciphertextBuffer = forge.util.createBuffer(ciphertext);
console.log('Ciphertext length (without 16 bytes IV): ' + ciphertextBuffer.length());

decipher.update(ciphertextBuffer);
decipher.finish(function() {
	console.log('Decrypt finished.');
	return true;
});

var outputBuffer = decipher.output;
var padding_length = outputBuffer.last();
var plaintextBuffer = outputBuffer.truncate(padding_length);
console.log('Plaintext length (without ' + padding_length + ' bytes padding): ' + plaintextBuffer.length());
fs.writeFileSync('data/Cover.jpg', plaintextBuffer.data, 'binary');

var debugBuffer = plaintextBuffer.truncate(plaintextBuffer.length() - 40);
console.log('Plaintext in Hex: ' + debugBuffer.toHex());
// console.log(plaintextBuffer.toString());
// console.log(plaintextBuffer.toHex());

// bytes = plaintextBuffer.getBytes();
// console.log(bytes);
