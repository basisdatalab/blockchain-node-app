const SHA256 = require("crypto-js/sha256");
class Blockvoter {
  constructor(
    index,
    name,
    email,
    polling_booth,
    admin_name,
    timestamp,
    hash,
    previous_hash
  ) {
    this.index = index;
    this.name = name;
    this.email = email;
    this.polling_booth = polling_booth;
    this.admin_name = admin_name;
    this.timestamp = timestamp;
    this.hash = hash;
    this.previous_hash = previous_hash;
  }

  calculateProperty(property) {
    return SHA256(property).toString();
  }

  calculateHash() {
    return SHA256(
      this.calculateProperty(this.index) +
        this.calculateProperty(this.name) +
        this.calculateProperty(this.email) +
        this.calculateProperty(this.polling_booth) +
        this.calculateProperty(this.admin_name) +
        this.calculateProperty(this.timestamp) +
        this.calculateProperty(this.hash) +
        this.calculateProperty(this.previous_hash)
    ).toString();
  }
  // isValid()
}

class BlockDatavoter {
  constructor(
    nim,
    index_detail,
    chosen_candidate,
    timestamp,
    hash,
    previous_hash
  ) {
    this.nim = nim;
    this.index_detail = index_detail;
    this.chosen_candidate = chosen_candidate;
    this.timestamp = timestamp;
    this.hash = hash;
    this.previous_hash = previous_hash;
  }

  calculateProperty(property) {
    return SHA256(property).toString();
  }

  calculateHash() {
    return SHA256(
      this.calculateProperty(this.nim) +
        this.calculateProperty(this.index_detail) +
        this.calculateProperty(this.chosen_candidate) +
        this.calculateProperty(this.timestamp) +
        this.calculateProperty(this.hash) +
        this.calculateProperty(this.previous_hash)
    ).toString();
  }
  // isValid()
}

module.exports.Blockvoter = Blockvoter;
module.exports.BlockDatavoter = BlockDatavoter;
