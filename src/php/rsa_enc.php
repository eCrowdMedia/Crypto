<?php
	require '../../vendor/autoload.php';
	$kpu =	"-----BEGIN PUBLIC KEY-----\n" .
			"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAujKMioTib4wJfe/24sZb\n" .
			"araEYHMk/p//UohrfHKpO/dBQ39FtMUb8IEZZZ5prLn0GwRNCf/XHfKa7CBCersG\n" .
			"/vQ4zFc9kIL9GEX/7ez1qFsJxgg5vhjOsdAf5xnnRovuRnZKrw0ihpPsPJiOtCD/\n" .
			"4ITyGNkdS9URaljwRt4gcd9wKEi9JnSBr2+JKkZT45GsyhOjroayjp8kL4KSzaTK\n" .
			"7NfHcNa37TP9i6k5PJrwaQ5CqE72pc8Vf3qval8XjablvLQmKd35mpY4sX9fswrd\n" .
			"IDARNE84DlGzuJcMVSh34d9ivgWSrunZelyebZ/ZyMH4NkzbqvkSHyvmBj4uMDaf\n" .
			"nQIDAQAB\n" .
			"-----END PUBLIC KEY-----";
	$rsa = new Crypt_RSA();
	$rsa->setEncryptionMode(CRYPT_RSA_ENCRYPTION_PKCS1);
	$rsa->loadKey($kpu);
	$plaintext = '1234567890123456';
	$ciphertext = base64_encode($rsa->encrypt($plaintext));
	echo $ciphertext;
