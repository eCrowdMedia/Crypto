var CryptoJS = require("crypto-js");
var fs = require('fs');
// var file = fs.readFileSync('data/chapter155.xhtml');
var file = fs.readFileSync('data/ciphertext');
var key = CryptoJS.enc.Base64.parse('4hoptVsjNOgNCYP2YglutPmY+qg1ZkAh9lXUIVus5Zs=');
var iv = CryptoJS.enc.Base64.parse(file.slice(0, 16).toString('base64'));
console.log(' IV:' + iv);
console.log('Key:' + key);
var encrypted = CryptoJS.enc.Base64.parse(file.slice(16).toString('base64'));
var decrypted = CryptoJS.AES.decrypt(encrypted, key, {mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7});
console.log(decrypted);
// console.log(decrypted.toString(CryptoJS.enc.Utf8));