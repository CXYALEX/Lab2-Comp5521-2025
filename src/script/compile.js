const solc = require('solc')
const fs = require('fs')

// Load the contract from file
const contract = fs.readFileSync('src/contract/Incrementer.sol', 'utf-8')

// Compile the contract using solc
const compileInput = {
  language: 'Solidity',
  sources: {
    'Incrementer.sol': {
      content: contract
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

// The compilation result of the contract
const compileOutput = JSON.parse(solc.compile(JSON.stringify(compileInput)))
const contractCore = compileOutput.contracts['Incrementer.sol']['Incrementer']

module.exports = contractCore
