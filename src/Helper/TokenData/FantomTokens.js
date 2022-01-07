//https://ftmscan.com/apis

//Get FTM Balance for a single Address
//https://api.ftmscan.com/api?module=account&action=balance&address=0x33e0e07ca86c869ade3fc9de9126f6c73dad105e&tag=latest&apikey=YourApiKeyToken

//Get ERC20-Token Account Balance for TokenContractAddress
//https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=0xddcb3ffd12750b45d32e084887fdf1aabab34239&address=0xba821dc848803900c01ba7ac1d7a034b95b1ed97&tag=latest&apikey=YourApiKeyToken




const ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
  },
];

const tokenAddresses = [
  "0x4e15361fd6b4bb609fa63c81a2be19d873717870", // ftm
];
module.exports = { tokenAddresses, ABI };

