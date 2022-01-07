//https://snowtrace.io/apis#accounts

/* Get Avax BALANCE from single Address: 
https://api.snowtrace.io/api?module=account&action=balance&address=0x0000000000000000000000000000000000001004&tag=latest&apikey=YourApiKeyToken
*/
/*Get ERC20-Token Account Balance for TokenContractAddress
https://api.snowtrace.io/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=0x89e73303049ee32919903c09e8de5629b84f59eb&tag=latest&apikey=YourApiKeyToken
*/
/*Get a list of 'Normal' Transactions By Address
https://api.snowtrace.io/api?module=account&action=txlist&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken
*/
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

