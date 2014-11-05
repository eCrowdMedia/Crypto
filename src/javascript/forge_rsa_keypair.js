var forge = require('node-forge');
var pki = forge.pki;
var rsa = pki.rsa;
var keypair = rsa.generateKeyPair(1024);
// console.log(keypair.privateKey);
// console.log(keypair.publicKey);

var kpu_pem = pki.publicKeyToPem(keypair.publicKey);
var kpr_pem = pki.privateKeyToPem(keypair.privateKey);
console.log(kpu_pem);
console.log(kpr_pem);
/*
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIAuolYD2It7Va6XgGDocgiw19
mt5OAHoK5aNaEyjfpdEKKaNgjs1SOZ0FLtwjUmdSUYcko363xh/yTpmFLn4jqmq+
9R5oQtwFRkWw+uLAdz9ahgPwl11/Z6ZMfMqfsw8ALdvjciKiVmBHFsX58ieGSKMR
TqawvGyUQjYjnsUVuQIDAQAB
-----END PUBLIC KEY-----

-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCIAuolYD2It7Va6XgGDocgiw19mt5OAHoK5aNaEyjfpdEKKaNg
js1SOZ0FLtwjUmdSUYcko363xh/yTpmFLn4jqmq+9R5oQtwFRkWw+uLAdz9ahgPw
l11/Z6ZMfMqfsw8ALdvjciKiVmBHFsX58ieGSKMRTqawvGyUQjYjnsUVuQIDAQAB
AoGAHmXAXOAYgJDGSG47c+cVTjGlrzfIjVhP7lWKX5w+m1Vc1c+egvsHamQT8s+Z
RY+qJdywvoCH1pzCEQ5+AyTz7cJV9VBvr0jfFbBxGmmwPD2RxJfru8KFN4tyZPM7
NKz1cBBVYD1VAnvTx92/TrJeK6xmSp7/7Jk/nPdAB9k3vv0CQQDYs+2qHrnPb6OZ
guaKFE5CTghZjzghZxKMt3g9+lL0VzvlE8uludDOpqe5gnNWxVcEaCMLpEKFhaAl
8m/BztXbAkEAoK0EvcJbKJf6s+41aNe17/lyBiN0GZeExV28x2s56xerA+AvYaHR
QN1ezxPNm7NRE5J1x+uGHw75cY6ciwy4+wJAd+mwxOd1uHS1WdgWjCfKWmRluHFJ
BSrNF/LaZalkR/MRoKSAlzcodYHA5CVsf4J5sWWSpvmBGfOkd/scnmk+6wJAJ+xV
rUDJncCFjoe1xaMzlbkJV/UfN+yqFNBBw9skvQFYgNIHc97dO5zFnfZxtCpODurp
UQ94d+ckm86vnu0+WQJAK1Uet+lEvwPqxgDGyDik9Nzra3onaKKAuCl8gyo4fUuO
Iq9MH9z8lzLFZylvRHhrg6/Kl+krRWYNJ37b9Pl6rw==
-----END RSA PRIVATE KEY-----
 */
