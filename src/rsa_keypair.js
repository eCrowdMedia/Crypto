var NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 1024});
console.log('Publickey: ', key.getPublicPEM());
console.log('Privatekey: ', key.getPrivatePEM());
var plaintext, ciphertext;
plaintext = '1234567890123456';
ciphertext = key.encrypt(plaintext, 'base64');
console.log('ciphertext: ', ciphertext);
plaintext = key.decrypt(ciphertext, 'utf8');
console.log('plaintext: ', plaintext);