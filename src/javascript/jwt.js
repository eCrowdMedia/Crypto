const crypto = require('crypto');

//Response when JWT is not valid.
const response401 = {
    statusCode: 401,
    statusDescription: 'Unauthorized'
};

// Remember to associate the KVS with your function before calling the const kvsKey = 'jwt.secret'.
// https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/kvs-with-functions-associate.html
const kvsKey = 'PSOds';
// set to true to enable console logging
const loggingEnabled = true;

function jwt_decode(token, key, noVerify, algorithm) {
    // check token
    if (!token) {
        throw new Error('No token supplied');
    }
    // check segments
    const segments = token.split('.');
    if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
    }

    // All segment should be base64
    const headerSeg = segments[0];
    const payloadSeg = segments[1];
    const signatureSeg = segments[2];

    // base64 decode and parse JSON
    const payload = JSON.parse(_base64urlDecode(payloadSeg));

    if (!noVerify) {
        const signingMethod = 'sha256';
        const signingType = 'hmac';

        // Verify signature. `sign` will return base64 string.
        const signingInput = [headerSeg, payloadSeg].join('.');

        if (!_verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
            throw new Error('Signature verification failed');
        }

        // Support for nbf and exp claims.
        // According to the RFC, they should be in seconds.
        if (payload.nbf && Date.now() < payload.nbf*1000) {
            throw new Error('Token not yet active');
        }

        if (payload.exp && Date.now() > payload.exp*1000) {
            throw new Error('Token expired');
        }
    }

    return payload;
}

//Function to ensure a constant time comparison to prevent
//timing side channels.
function _constantTimeEquals(a, b) {
    if (a.length != b.length) {
        return false;
    }

    let xor = 0;
    for (let i = 0; i < a.length; i++) {
    xor |= (a.charCodeAt(i) ^ b.charCodeAt(i));
    }

    return 0 === xor;
}

function _verify(input, key, method, type, signature) {
    if(type === "hmac") {
        return _constantTimeEquals(signature, _sign(input, key, method));
    }
    else {
        throw new Error('Algorithm type not recognized');
    }
}

function _sign(input, key, method) {
    return crypto.createHmac(method, key).update(input).digest('base64url');
}

// get secret from key value store
async function getSecret() {
    // initialize cloudfront kv store and get the key value
    try {
        const kvsHandle = cf.kvs();
        return await kvsHandle.get(kvsKey);
    } catch (err) {
        log(`Error reading value for key: ${kvsKey}, error: ${err}`);
        return null;
    }

}

function _base64urlDecode(str) {
    return Buffer.from(str, 'base64url')
}

function log(message) {
    if (loggingEnabled) {
        console.log(message);
    }
}

const secret_key = Buffer.from('X47OBPKN9mPjaqTT762BgILwvVsucqsbMPIYLtinXew', 'base64url');
const jwtToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IlBTT2RzIn0.eyJpc3MiOiJtb28iLCJleHAiOjE3MzM4ODUzNzQsImF1ZCI6IjBhOUE3TkVSaFczY19TRGVMdTktaWciLCJzdWIiOiI3NjY1MjloMjEiLCJ2IjoiQ0VXekNjZTV1VmV2MmV6M2RhVENIdyIsImlhdCI6MTczMzc5ODk3NX0.U3-U2CHMXqr0KFaTUiGUOIB9K3ntfJRWp86ndcE8D-A';

try{
    payload = jwt_decode(jwtToken, secret_key);
    console.log(payload);
}
catch(e) {
    log(e);
    return response401;
}
