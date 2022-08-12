require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const IOTEX_PRIVATE_KEY = process.env.IOTEX_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    testnet: {
      url: "https://babel-api.testnet.iotex.io",
      accounts: [`${IOTEX_PRIVATE_KEY}`],
    },
    mainnet: {
      url: "https://babel-api.mainnet.iotex.io",
      accounts: [`${IOTEX_PRIVATE_KEY}`],
    },
  }
};