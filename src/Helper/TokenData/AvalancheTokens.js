//https://snowtrace.io/apis#accounts
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
    
  '0xb54f16fB19478766A268F172C9480f8da1a7c9C3' //Time
  
]
module.exports = {tokenAddresses, ABI};

