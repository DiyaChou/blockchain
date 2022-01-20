const EC = require('elliptic').ec;
const SHA256 = require("crypto-js/sha256");
const uuidV1 = require("uuid").v1
const ec = new EC('secp256k1'); //sec= standards of efficient cryptography, p= prime, 256- 256 bit, k - colditz (notable mathematician), 1 this being the first implementation

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidV1();
    }
    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}

module.exports = ChainUtil;