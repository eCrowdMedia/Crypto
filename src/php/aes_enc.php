<?php
	require 'vendor/autoload.php';
	$aes_key = base64_decode('4hoptVsjNOgNCYP2YglutPmY+qg1ZkAh9lXUIVus5Zs=');
	$plaintext = '1234567890123456';
	$iv = mcrypt_create_iv(
		mcrypt_get_iv_size(
			MCRYPT_RIJNDAEL_128,
			MCRYPT_MODE_CBC
		),
		MCRYPT_RAND
	);
	$aes = new Crypt_AES();
	$aes->setIV($iv);
	$aes->setKey($aes_key);
	file_put_contents('data/ciphertext', $iv . $aes->encrypt($plaintext));
