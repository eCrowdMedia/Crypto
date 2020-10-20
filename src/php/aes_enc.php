<?php
    require 'vendor/autoload.php';
    use phpseclib\Crypt\AES;

    $aes_key_length = 128;
    $hash = hash('sha256', '1234567890123456');
    $aes_key = substr(pack('H*', $hash), 0, $aes_key_length / 8); // Now, aes_key is 7a51d064a1a216a692f753fcdab276e4
    // $plaintext_in_hex = '66554433221100998877665544332211';
    // $plaintext = pack('H*', $plaintext_in_hex);
    $plaintext = 'eCrowdMedia Inc. 2014 copywrite.';
    $iv = mcrypt_create_iv(
        mcrypt_get_iv_size(
            MCRYPT_RIJNDAEL_128,
            MCRYPT_MODE_CBC
        ),
        MCRYPT_RAND
    );
    $aes = new AES();
    $aes->setIV($iv);
    $aes->setKey($aes_key);
    echo 'IV: ' . bin2hex($iv) . PHP_EOL;
    echo 'AES Key: ' . bin2hex($aes_key) . PHP_EOL;
    file_put_contents('data/ciphertext', $iv . $aes->encrypt($plaintext));
