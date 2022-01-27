# Scaffold-IoTeX
Everything you need to start building on IoTeX, by tutorials!

# steps to start 

## clone this repo
```bash
git clone https://github.com/iotexproject/scaffold-iotex.git
cd scaffold-iotex
yarn install
```
## add private key
From `scaffold-iotex` dir run
```bash
touch ./packages/hardhat/.env
```
open created .env file and add the following string
```txt
PRIVATE_KEY=0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```
and change private key for one that you own.
This account will be used to deploy contracts and run scripts on network you choose. Make sure you have some IOTX on this account.
## deploy
Firstly run
```bash
yarn compile
```
to have contract types generated for you. Next run 
```bash
yarn test
```
, it will run simple test on hardhat network. If all test are passed you can run
```bash
yarn deploy
``` 
to deploy contracts on iotex testnet or 
```bash
yarn deploy-mainnet
``` 
to deploy contracts on iotex mainnet. If contracts were deployed successfully, you will find info about deployed contracts (abi and addresses)
## start client
After deploying your smart contracts, from `scaffold-iotex` dir run
```bash
yarn dev
```
or
```bash
yarn build
yarn start
```
It will start a server on http://localhost:3000/. You will be able to open your dapp in a browser. 
There you will be able to see balances and transfer your PBL.
## customize the app in any way you want
any contributions to the code are welcomed!