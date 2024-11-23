// script.js

class Block {
  constructor(index, timestamp, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions; // Each transaction is a vote
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return `${this.index}${this.timestamp}${JSON.stringify(this.transactions)}${
      this.previousHash
    }${this.nonce}`;
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions() {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    this.pendingTransactions = []; // Reset pending transactions after adding to blockchain
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getVotesCount() {
    const votes = {};
    this.chain.forEach((block) => {
      if (Array.isArray(block.transactions)) {
        block.transactions.forEach((transaction) => {
          const candidate = transaction.candidate;
          if (votes[candidate]) {
            votes[candidate]++;
          } else {
            votes[candidate] = 1;
          }
        });
      }
    });
    return votes;
  }
}

// Initialize the blockchain
const votingBlockchain = new Blockchain();

function castVote() {
  const candidate = document.getElementById("candidate").value;
  const vote = { candidate };
  votingBlockchain.createTransaction(vote);
  votingBlockchain.minePendingTransactions();

  displayResults();
}

function displayResults() {
  const votes = votingBlockchain.getVotesCount();
  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = "";

  for (const [candidate, count] of Object.entries(votes)) {
    const li = document.createElement("li");
    li.textContent = `${candidate}: ${count} votes`;
    resultsList.appendChild(li);
  }
}
