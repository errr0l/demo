const crypto = require("crypto");

function encode(input) {
    const hash = crypto.createHash('sha256');
    hash.update(Buffer.from(input, 'utf-8'));
    const digest = hash.digest();
    return new Uint8Array(digest.buffer, digest.byteOffset, digest.byteLength);
}

exports.encode = encode;