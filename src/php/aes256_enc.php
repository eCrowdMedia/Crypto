<?php
    require 'vendor/autoload.php';
    $lcp_json = json_decode(file_get_contents('data/lcp/lcp.json'), true);
    $aes_key = base64_decode($lcp_json['content-encryption-key']);
    print_r('AES key length: ' . (strlen($aes_key) * 8) . ' bits' . PHP_EOL);

    $file = file_get_contents('data/lcp/cipher_lcp/OEBPS/Styles/style2.css');
    $iv = substr($file, 0, 16);
    $ciphertext = substr($file, 16);

    $aes = new Crypt_AES();
    // $aes->enableContinuousBuffer();
    // $aes->enablePadding();
    $aes->setIV($iv);
    $aes->setKey($aes_key);

    echo 'IV: ' . bin2hex($iv) . PHP_EOL;
    echo 'AES Key: ' . bin2hex($aes_key) . PHP_EOL;
    echo $aes->decrypt($ciphertext) . PHP_EOL;
