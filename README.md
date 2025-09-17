# Lab2-Comp5521-2025
A sample project for contract deployment and transaction execution using [Web3.js](https://github.com/ChainSafe/web3.js).

Designed for COMP5521, Department of Computing, PolyU.

## Preface

This project demonstrates how to compile a Ethereum Smart Contract using `solc`, deploy and invoke contracts using `web3.js`.

## Dependency

```
dotenv:   ^16.3.1
solc:     ^0.8.21
web3:     ^4.1.2
```

## Deployment

- Run the image to initiate a container:

  ```shell
  $ docker run -d --rm --name web3 \
      -it crumblejon/smart-contract-web3
  ```

  This will pull the image `crumblejon/smart-contract-web3` from Docker Hub and run it in Docker.

- Configure your API key and private key by:

  ```
  $ docker exec web3 \
      npm run secret \
      <your_API_key> <your_private_key>
  ```

  You can get an API key from [Infura](https://infura.io/), and find your private key from the MetaMask extension.

## Execution

- Deploying the `Incrementor.sol` smart contract:

  ```shell
  $ docker exec web3 \
      npm run deploy
  ```

  This will deploy the contract to Sepolia Test Network, and return its address on the blockchain.

- Increment the counter by a certain value:

  ```shell
  $ docker exec web3 \
      npm run increment \
      <contract_address> <value>
  ```

  This will add a `value` to the counter in the contract.

- Check the counter state in the contract:

  ```shell
  $ docker exec web3 \
      npm run counter \
      <contract_address>
  ```

- Reset the counter value to a certain value:

  ```shell
  $ docker exec web3 \
      npm run reset \
      <contract_address> <value>
  ```

  This will reset the counter value in the contract to the given value.

## License

This repository is released under [MIT](https://github.com/wurahara/Lab5-web3/blob/main/LICENSE) license. Copyright © [Jon](https://github.com/wurahara).
