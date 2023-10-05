const { Web3 } = require('web3')
const env = require('dotenv')
const contract = require('./compile')

// Load private settings from .secret file
env.config({ path: 'src/env/.secret' })
const secret = {
  node: process.env.PROJECT_ID,
  key: process.env.PRIVATE_KEY
}

// Construct web3 instance and account under Sepolia provider
const provider = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/' + secret.node)
const instance = new Web3(provider)
const account = instance.eth.accounts.privateKeyToAccount('0x' + secret.key)

// Load contract artifacts
const abi = contract.abi

// Reset the counter to 0 by initiating a new transaction
async function reset(value, address) {
  // Index the deployed contract instance by the contract address
  const contract = new instance.eth.Contract(abi, address)

  // Create a raw transaction by invoking the reset method
  const resetTransaction = contract.methods.reset(value)

  // Sign the raw transaction
  const signedTransaction = await instance.eth.accounts.signTransaction({
    to: address,
    data: resetTransaction.encodeABI(),
    gas: 1000000,
    gasPrice: 1000000000,
    from: account.address
  }, account.privateKey)

  // Send the transaction to Sepolia network via Infrua node
  const resetReceipt = await instance.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  )

  // Get the transaction hash
  return resetReceipt.transactionHash
}

(async () => {
  const address = process.argv[2].trim()
  const value =  process.argv[3].trim()
  console.log(`\nReseting the counter to ${value} ...`)
  const tx_hash = await reset(value, address)
  console.log(`Transaction successful with hash: ${tx_hash}`)
})()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })