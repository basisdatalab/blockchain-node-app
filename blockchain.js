const SHA256 = require("crypto-js/sha256");

// console.log(SHA256("abaaa").toString()); percobaan

class Block {
  constructor(index, name, email, polling_booth, admin_name, previous_hash) {
    this.index = index;
    this.name = name;
    this.email = email;
    this.polling_booth = polling_booth;
    this.admin_name = admin_name;
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
        this.calculateProperty(this.previous_hash)
    ).toString();
  }
  // isValid()
}

const Genesis = new Block(
  0,
  "Genesis Block",
  "genesis@email.com",
  99,
  "Genesis"
);

const Daffa = new Block(
  1,
  "daffa",
  "barin@email.com",
  4,
  "dinu",
  Genesis.calculateHash()
);

console.log(Daffa.previous_hash);

module.exports = Block;
// console.log(Daffa.calculateHash());
// console.log(Genesis.calculateHash());
