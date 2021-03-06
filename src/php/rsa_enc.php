<?php
    require 'vendor/autoload.php';
    use phpseclib\Crypt\RSA;

    $kpu =	"-----BEGIN PUBLIC KEY-----\n" .
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIAuolYD2It7Va6XgGDocgiw19\n" .
            "mt5OAHoK5aNaEyjfpdEKKaNgjs1SOZ0FLtwjUmdSUYcko363xh/yTpmFLn4jqmq+\n" .
            "9R5oQtwFRkWw+uLAdz9ahgPwl11/Z6ZMfMqfsw8ALdvjciKiVmBHFsX58ieGSKMR\n" .
            "TqawvGyUQjYjnsUVuQIDAQAB\n" .
            "-----END PUBLIC KEY-----\n";
    $rsa = new RSA();
    $rsa->setEncryptionMode(RSA::ENCRYPTION_PKCS1);
    $rsa->loadKey($kpu);
    $plaintext = '1234567890123456';
    $ciphertext = base64_encode($rsa->encrypt($plaintext));
    echo $ciphertext;
