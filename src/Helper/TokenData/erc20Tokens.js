//https://docs.etherscan.io/

const ABI = [{
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  }]


const tokenAddresses = [ 

   // '0xb54f16fB19478766A268F172C9480f8da1a7c9C3', //Time
    '0x990f341946a3fdb507ae7e52d17851b87168017c',// 'strong']//strong
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',// 'usdc'], //USDC
    '0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f', //'sOhm'] //staked OHM
    '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', //wrapped matic
    

]
module.exports = {tokenAddresses, ABI};

