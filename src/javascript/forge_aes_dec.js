var forge = require('node-forge');
var fs = require('fs');
var file = fs.readFileSync('data/ciphertext');
var aeskey = forge.util.decode64('4hoptVsjNOgNCYP2YglutPmY+qg1ZkAh9lXUIVus5Zs=');
var iv = file.toString('binary', 0, 15);
var ciphertext = file.toString('binary', 16);
var plaintext = aeskey.decrypt(ciphertext);