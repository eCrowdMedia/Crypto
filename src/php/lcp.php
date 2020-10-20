<?php
    require 'vendor/autoload.php';
    use phpseclib\Crypt\AES;

    try {
        $base = 'data/lcp/';

        print_r("Loading lcp.json......\n");
        $lcp_json = json_decode(file_get_contents($base . 'lcp.json'), true);
        if (empty($lcp_json)) {
            throw new Exception('Load failed');
        }
        // print_r($lcp_json);

        $cipher_base = $base.pathinfo($lcp_json['protected-content-location'], PATHINFO_FILENAME).'/';
        print_r("Loading META-INF/container.xml......\n");
        $container = simplexml_load_file($cipher_base . 'META-INF/container.xml');
        if (empty($container)) {
            throw new Exception('Load failed');
        }

        # Get opf pathname
        $container->registerXPathNamespace('ns', 'urn:oasis:names:tc:opendocument:xmlns:container');
        $opf_pathname = (string)current($container->xpath('ns:rootfiles/ns:rootfile[@media-type="application/oebps-package+xml"][1]/@full-path'));
        $opf_base = ltrim(pathinfo($opf_pathname, PATHINFO_DIRNAME) . '/', '/');

        print_r("Loading {$opf_pathname}......\n");
        $opf = simplexml_load_file($cipher_base.$opf_pathname);
        if (empty($opf)) {
            throw new Exception('Load failed');
        }

        # Get first spine item
        $opf->registerXPathNamespace('opf', 'http://www.idpf.org/2007/opf');
        $idref = (string)current($opf->xpath('opf:spine[1]/opf:itemref/@idref'));
        $href = $opf_base . current($opf->xpath(sprintf(
            'opf:manifest[1]/opf:item[@id="%s"]/@href',
            $idref
        )));

        print_r("Loading META-INF/encryption.xml......\n");
        $enc = simplexml_load_file($cipher_base.'META-INF/encryption.xml');
        if (empty($enc)) {
            throw new Exception('Failed to load encryption.xml');
        }

        # Get encryption information
        $enc->registerXPathNamespace('enc', 'http://www.w3.org/2001/04/xmlenc#');
        $encryptedData = current($enc->xpath("enc:EncryptedData[enc:CipherData/enc:CipherReference/@URI='{$href}'][1]"));
        $encryptedData->registerXPathNamespace('enc', 'http://www.w3.org/2001/04/xmlenc#');
        $encryptedData->registerXPathNamespace('ds', 'http://www.w3.org/2000/09/xmldsig#');
        $encryptedData->registerXPathNamespace('ec', 'http://www.idpf.org/2016/encryption#compression');
        $encrypt_meta = [
            'method' => (string)current($encryptedData->xpath('enc:EncryptionMethod/@Algorithm')),
            'keyinfo' => (string)current($encryptedData->xpath('ds:KeyInfo/ds:RetrievalMethod[@Type="http://readium.org/2014/01/lcp#EncryptedContentKey"][@URI]/@URI')),
            'compression' => current(current($encryptedData->xpath('enc:EncryptionProperties/enc:EncryptionProperty/ec:Compression[1]'))->attributes()),
        ];
        // print_r($encrypt_meta);

        $cipher_filesize = filesize($cipher_base.$href);

        # Get cipher's handle
        $cipher_handle = fopen($cipher_base.$href, 'rb');
        if ($cipher_handle === false) {
            throw new Exception('Failed to open cipher file');
        }

        # Initial AES
        if (preg_match(
            '~http://www.w3.org/2001/04/xmlenc#aes(128|192
            256)-cbc~',
            $encrypt_meta['method']
        )) {
            throw new Exception('Only support AES CBC decryption');
        }
        $aes = new AES();

        # Load 16 bytes IV
        $iv_length = 16;
        $iv = fread($cipher_handle, $iv_length);
        $aes->setIV($iv);
        echo 'IV: ' . bin2hex($iv) . PHP_EOL;

        # Get AES key
        $aes_key = base64_decode($lcp_json['content-encryption-key']);
        $aes->setKey($aes_key);
        print_r('AES Key: ' . bin2hex($aes_key) . ' in ' . (strlen($aes_key) * 8) . " bits\n");

        # Decrypt
        $plaintext = $aes->decrypt(fread($cipher_handle, $cipher_filesize - $iv_length));

        # Deflate if necessary
        if (!empty($encrypt_meta['compression']['Method'])) {
            print_r("Deflating......\n");
            $plaintext = gzinflate($plaintext);
        }
        print_r(substr($plaintext, 0, 256) . "......\n");
    } catch (Exception $e) {
        sd($e->getMessage());
    }
