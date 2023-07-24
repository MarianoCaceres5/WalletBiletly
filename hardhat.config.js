require("@nomicfoundation/hardhat-toolbox");

const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test"
  },
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545"
    },
    polygon: {
      url: "https://rpc-mumbai.maticvigil.com/v1/a07219db75637edfe2d7579d52c3e2863e8a307c",
      accounts: [privateKey]
    },
    hardhat: {
    },
  },
  images:{
    // domains: ["<subdomain>.infura-ipfs.io", "infura-ipfs.io"]
    domains: ["infura-ipfs.io"]
  },
};