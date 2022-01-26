import { task } from "hardhat/config"
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-contract-sizer";
import '@openzeppelin/hardhat-upgrades';
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'
import {config} from "dotenv"

config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    iotex: {
      url: 'https://babel-api.mainnet.iotex.io',
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4689,
      gas: 8500000,
      gasPrice: 1000000000000
    },
    iotex_testnet: {
      url: 'https://babel-api.testnet.iotex.io',
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4690,
      gas: 8500000,
      gasPrice: 1000000000000
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    target: 'ethers-v5',
  },
  namedAccounts: {
    admin: 0,
    operator: 1,
    user1: 2,
    user2: 3,
    hacker: 4
  }
};
