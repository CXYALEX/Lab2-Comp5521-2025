const solc = require('solc')
const fs = require('fs')

// Load the contract from file
const contract = fs.readFileSync('src/contract/Incrementer.sol', 'utf-8')

// Compile the contract using solc
const input_file = {
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
const output_file = JSON.parse(solc.compile(JSON.stringify(input_file)))
const contract_core = output_file.contracts['Incrementer.sol']['Incrementer']

module.exports = contract_core
