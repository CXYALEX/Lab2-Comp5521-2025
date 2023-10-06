const { Web3 } = require('web3')
const env = require('dotenv')
const contract_core = require('./compile')

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
const abi = contract_core.abi
const bytecode = contract_core.evm.bytecode.object

// Deploy contract by initiating a new transaction
async function deploy() {
  // Construct contract instance
  const contract = new instance.eth.Contract(abi)

  // Create raw transaction
  const raw_transaction = contract.deploy({
    data: bytecode,
    arguments: [4142]
  })

  // Sign the raw transaction
  const signed_transaction = await instance.eth.accounts.signTransaction({
    data: raw_transaction.encodeABI(),
    gas: 1000000,
    gasPrice: 1000000000,
    from: account.address
  }, account.privateKey)


  // Send the transaction to Sepolia network via Infrua node
  const deploy_receipt = await instance.eth.sendSignedTransaction(
    signed_transaction.rawTransaction
  )

  // Get the deployment receipt
  return deploy_receipt.contractAddress
}

(async () => {
  console.log(`Waiting for contract deployment...`)
  const address = await deploy()
  console.info(`The contract has been deployed at address: ${address}`)
  console.log(`You can check the state here: https://sepolia.etherscan.io/address/${address}`)
})()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })