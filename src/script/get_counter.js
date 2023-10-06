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
const abi = contract.abi

// Read the counter state of the Incrementer contract
// Note that getCounter is a 'view' method, thus calling it does not require sending a transaction
async function getCounter(address) {
  // Get the deployed contract instance by the contract address
  const contract = new instance.eth.Contract(abi, address)

  // Call the getCounter method and get the state
  const counter = await contract.methods.getCounter().call()
  return counter
}

(async () => {
  if (process.argv.length < 3) {
    throw new Error('Please provide the contract address as an argument')
  }
  const address = process.argv[2].trim()
  console.log(`\nQuerying the counter ...`)
  let counter = await getCounter(address)
  console.log(`The current counter stored in the contract is: ${counter}`)
})()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })