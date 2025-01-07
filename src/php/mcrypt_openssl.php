<?php
function encrypt_mcrypt($msg, $key, $iv = null, $padding = null) {
    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    if (!$iv) {
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    }
    if ($padding !== false) {
        $pad = $iv_size - (strlen($msg) % $iv_size);
        $msg .= str_repeat(chr($pad), intval($padding ?? $pad));
    }
    $encryptedMessage = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $msg, MCRYPT_MODE_CBC, $iv);
    return base64_encode($iv . $encryptedMessage);
}
function decrypt_mcrypt($payload, $key) {
    $raw = base64_decode($payload);
    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    $iv = substr($raw, 0, $iv_size);
    $data = substr($raw, $iv_size);
    $result = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, $iv);
    $ctrlchar = substr($result, -1);
    $ord = ord($ctrlchar);
    if ($ord < $iv_size && substr($result, -ord($ctrlchar)) === str_repeat($ctrlchar, $ord)) {
        $result = substr($result, 0, -ord($ctrlchar));
    }
    return $result;
}

function encrypt_openssl($msg, $key, $iv = null, $options = OPENSSL_RAW_DATA) {
    $iv_size = openssl_cipher_iv_length('AES-128-CBC');
    if (!$iv) {
        $iv = openssl_random_pseudo_bytes($iv_size);
    }
    $encryptedMessage = openssl_encrypt($msg, 'AES-128-CBC', $key, $options, $iv);
    return base64_encode($iv . $encryptedMessage);
}
function decrypt_openssl($payload, $key, $options = OPENSSL_RAW_DATA) {
    $raw = base64_decode($payload);
    $iv_size = openssl_cipher_iv_length('AES-128-CBC');
    $iv = substr($raw, 0, $iv_size);
    $data = substr($raw, $iv_size);
    return openssl_decrypt($data, 'AES-128-CBC', $key, $options, $iv);
}

$iv = '264c83fdaa8ffd35';
$key = '575991f356bb554358e043c760d55b1a';
$plaintext = '123456789012345678901234567890';
$cipher['mcrypt_no_padding'] = encrypt_mcrypt($plaintext, hex2bin($key), $iv, false) . PHP_EOL;
$cipher['mcrypt_zero_padding'] = encrypt_mcrypt($plaintext, hex2bin($key), $iv, "\0") . PHP_EOL;
$cipher['mcrypt'] = encrypt_mcrypt($plaintext, hex2bin($key), $iv) . PHP_EOL;
$cipher['openssl_zero_padding'] = encrypt_openssl($plaintext, hex2bin($key), $iv, OPENSSL_RAW_DATA | OPENSSL_NO_PADDING) . PHP_EOL;
$cipher['openssl'] = encrypt_openssl($plaintext, hex2bin($key), $iv) . PHP_EOL;
var_dump($cipher);