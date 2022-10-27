const web3 = require('web3')
const env = require('dotenv')
const contract = require('./compile')

// Load private settings from .secret file
env.config({ path: 'src/env/.secret' })
const secret = {
  node: process.env.PROJECT_ID,
  key: process.env.PRIVATE_KEY
}

// Construct web3 instance and account under Goerli provider
const web3Instance = new web3('https://goerli.infura.io/v3/' + secret.node)
const account = web3Instance.eth.accounts.privateKeyToAccount(secret.key)

// Load contract artifacts
const abi = contract.abi
const bytecode = contract.evm.bytecode.object

// Deploy contract by initiating a new transaction
async function deploy() {
  // Construct contract instance
  const contract = new web3Instance.eth.Contract(abi)

  // Create raw transaction
  const deployTransaction = contract.deploy({
    data: bytecode,
    arguments: [4142]
  })

  // Sign the raw transaction
  const signedTransaction = await web3Instance.eth.accounts.signTransaction({
    data: deployTransaction.encodeABI(),
    gas: 1000000
  }, account.privateKey)

  // Send the transaction to Goerli network via Infrua node
  const deployReceipt = await web3Instance.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  )

  // Get the deployment receipt
  return deployReceipt.contractAddress
}

// Read the counter state of the Incrementer contract
// Note that getCounter is a 'view' method, thus calling it does not require sending a transaction
async function getCounter(contractAddress) {
  // Get the deployed contract instance by the contract address
  const contract = new web3Instance.eth.Contract(abi, contractAddress)

  // Call the getCounter method and get the state
  const counter = await contract.methods.getCounter().call()
  return counter
}

// Increment the counter by initiating a new transaction
async function increment(value, contractAddress) {
  // Index the deployed contract instance by the contract address
  const contract = new web3Instance.eth.Contract(abi, contractAddress)

  // Create a raw transaction by invoking the increment method
  const incrementTransaction = contract.methods.increment(value)

  // Sign the raw transaction
  const signedTransaction = await web3Instance.eth.accounts.signTransaction({
    to: contractAddress,
    data: incrementTransaction.encodeABI(),
    gas: 1000000
  }, account.privateKey)

  // Send the transaction to Goerli network via Infrua node
  const incrementReceipt = await web3Instance.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  )

  // Get the transaction hash
  return incrementReceipt.transactionHash
}

// Reset the counter to 0 by initiating a new transaction
async function reset(contractAddress) {
  // Index the deployed contract instance by the contract address
  const contract = new web3Instance.eth.Contract(abi, contractAddress)

  // Create a raw transaction by invoking the reset method
  const resetTransaction = contract.methods.reset()

  // Sign the raw transaction
  const signedTransaction = await web3Instance.eth.accounts.signTransaction({
    to: contractAddress,
    data: resetTransaction.encodeABI(),
    gas: 1000000
  }, account.privateKey)

  // Send the transaction to Goerli network via Infrua node
  const resetReceipt = await web3Instance.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  )

  // Get the transaction hash
  return resetReceipt.transactionHash
}

// Wrap the whole interaction process into an async function
async function interact() {
  
  // Contract Deployment
  console.log(`Waiting for contract deploying ...`)
  const address = await deploy()
  console.log(`The contract has been deployed successfully`)
  console.log(`The deployed contract can been viewed at: https://goerli.etherscan.io/address/${address}`)

  // Querying
  console.log(`\nQuerying the counter ...`)
  let counter = await getCounter(address)
  console.log(`The current counter stored in smart contract is: ${counter}`)

  // Incrementing
  const value = 5
  console.log(`\nIncrementing the counter by ${value} ...`)
  const incrementTxHash = await increment(value, address)
  console.log(`Transaction successful with hash: ${incrementTxHash}`)

  // Querying Again
  console.log(`\nQuerying the counter ...`)
  counter = await getCounter(address)
  console.log(`The current counter stored in smart contract is: ${counter}`)

  // Reseting
  console.log(`\nReseting the counter ...`)
  const resetTxHash = await reset(address)
  console.log(`Transaction successful with hash: ${resetTxHash}`)

  // Querying Again
  console.log(`\nQuerying the counter ...`)
  counter = await getCounter(address)
  console.log(`The current counter stored in smart contract is: ${counter}`)
}

// Trigger the interaction using promise chain
interact()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error)
    process.exit(1)
  })