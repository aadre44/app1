
const avaxABI = [{
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
    
  ['0xb54f16fB19478766A268F172C9480f8da1a7c9C3', 'time'], //Time
  
]
module.exports = {tokenAddresses, erc20ABI};

