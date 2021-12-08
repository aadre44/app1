
const erc20ABI = [{
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
    '0x990f341946a3fdb507ae7e52d17851b87168017c', //strong
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', //USDC
    '0x383518188c0c6d7730d91b2c03a03c837814a899', //OHM
    '0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f' //staked OHM

]
module.exports = {tokenAddresses, erc20ABI};

/*
const tokenAddresses = [
    '0x123',
    '0x456',
];
const myAddress = '0x789';

for (let tokenAddress of tokenAddresses) {
    const contract = new web3.eth.Contract(erc20AbiJson, tokenAddress);
    const tokenBalance = await contract.methods.balanceOf(myAddress).call();
}*/