var forge = require('node-forge');
var pki = forge.pki;
var rsa = pki.rsa;

var kpu_pem = "-----BEGIN PUBLIC KEY-----\n" +
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIAuolYD2It7Va6XgGDocgiw19\n" +
"mt5OAHoK5aNaEyjfpdEKKaNgjs1SOZ0FLtwjUmdSUYcko363xh/yTpmFLn4jqmq+\n" +
"9R5oQtwFRkWw+uLAdz9ahgPwl11/Z6ZMfMqfsw8ALdvjciKiVmBHFsX58ieGSKMR\n" +
"TqawvGyUQjYjnsUVuQIDAQAB\n" +
"-----END PUBLIC KEY-----\n";

var kpr_pem = "-----BEGIN RSA PRIVATE KEY-----\n" +
"MIICWwIBAAKBgQCIAuolYD2It7Va6XgGDocgiw19mt5OAHoK5aNaEyjfpdEKKaNg\n" +
"js1SOZ0FLtwjUmdSUYcko363xh/yTpmFLn4jqmq+9R5oQtwFRkWw+uLAdz9ahgPw\n" +
"l11/Z6ZMfMqfsw8ALdvjciKiVmBHFsX58ieGSKMRTqawvGyUQjYjnsUVuQIDAQAB\n" +
"AoGAHmXAXOAYgJDGSG47c+cVTjGlrzfIjVhP7lWKX5w+m1Vc1c+egvsHamQT8s+Z\n" +
"RY+qJdywvoCH1pzCEQ5+AyTz7cJV9VBvr0jfFbBxGmmwPD2RxJfru8KFN4tyZPM7\n" +
"NKz1cBBVYD1VAnvTx92/TrJeK6xmSp7/7Jk/nPdAB9k3vv0CQQDYs+2qHrnPb6OZ\n" +
"guaKFE5CTghZjzghZxKMt3g9+lL0VzvlE8uludDOpqe5gnNWxVcEaCMLpEKFhaAl\n" +
"8m/BztXbAkEAoK0EvcJbKJf6s+41aNe17/lyBiN0GZeExV28x2s56xerA+AvYaHR\n" +
"QN1ezxPNm7NRE5J1x+uGHw75cY6ciwy4+wJAd+mwxOd1uHS1WdgWjCfKWmRluHFJ\n" +
"BSrNF/LaZalkR/MRoKSAlzcodYHA5CVsf4J5sWWSpvmBGfOkd/scnmk+6wJAJ+xV\n" +
"rUDJncCFjoe1xaMzlbkJV/UfN+yqFNBBw9skvQFYgNIHc97dO5zFnfZxtCpODurp\n" +
"UQ94d+ckm86vnu0+WQJAK1Uet+lEvwPqxgDGyDik9Nzra3onaKKAuCl8gyo4fUuO\n" +
"Iq9MH9z8lzLFZylvRHhrg6/Kl+krRWYNJ37b9Pl6rw==\n" +
"-----END RSA PRIVATE KEY-----\n";
 
var kpr = pki.privateKeyFromPem(kpr_pem);
var kpu = pki.publicKeyFromPem(kpu_pem);

var md = forge.md.sha256.create();
md.update("4d/849f16e0390416e57d61c024daa3ae98b29e5e/OEBPS/");
var aeskey = md.digest();
console.log(aeskey.toHex());
var plaintext = /*aeskey.data*/"1234567890123456";
var ciphertext = kpu.encrypt(plaintext);
console.log(ciphertext);
plaintext = kpr.decrypt(ciphertext);
console.log(plaintext);
