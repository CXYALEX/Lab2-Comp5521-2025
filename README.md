# Lab5-web3
A sample project for contract deployment and transaction execution using [web3.js](https://github.com/ChainSafe/web3.js).

Designed for COMP4142, Department of Computing, PolyU.

## Preface

This project demonstrates how to compile a Ethereum Smart Contract using `solc`, deploy and invoke contracts using `web3.js`.

## Dependency

```
dotenv:   ^16.0.3
solc:     ^0.8.17
web3:     ^1.8.0
```

## Deployment

- Node and npm needed.

- Download this repository to your own device:

  ```shell
  $ git clone git@github.com:wurahara/Lab5-web3.git
  $ cd Lab5-web3
  ```

- Configure your node and private key by modifying `src/env/.secret`:

  ```
  PROJECT_ID=<your_project_id_here>
  PRIVATE_KEY=<your_private_key_here>
  ```

  You can get a project id from [infrua](https://infura.io/), and find your private key from metamask. You can refer to the lab recording for more details.

- Install the dependencies:

  ```shell
  $ npm i
  ```

- Execute the program for contract compilation and deployment:

  ```shell
  $ npm run activate
  ```

## License

This repository is released under [MIT](https://github.com/wurahara/Lab5-web3/blob/main/LICENSE) license. Copyright © [Jon](https://github.com/wurahara).