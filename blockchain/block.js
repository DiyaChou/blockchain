const ChainUtil = require('../chain-util')
const {DIFFICULTY, MINE_RATE} = require('../config')

class Block {
  constructor(timestamp, lasthash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  toString() {
    return `Block -
    Timestamp: ${this.timestamp}
    Last Hash: ${this.lasthash.substring(0, 10)}
    Hash: ${this.hash.substring(0, 10)}
    Nonce: ${this.nonce}
    Difficulty: ${this.difficulty}
    Data: ${this.data}
    `;
  }

  static genesis() {
    return new this("Genesis time", "-----", "f1r57-h45h", [], 0, DIFFICULTY);
  }

  static hash(timestamp, lasthash, data, nonce, difficulty) {
    return ChainUtil.hash(`${timestamp}${lasthash}${data}${nonce}${difficulty}`);
  }

  static mineBlock(lastBlock, data) {
    const lasthash = lastBlock.hash;
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lasthash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, lasthash, hash, data, nonce, difficulty);
  }

  static blockHash(block) {
    const { timestamp, lasthash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lasthash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let {difficulty} = lastBlock;
    difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
    return difficulty;
  }
}

module.exports = Block;
