const fantomABI = [
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
module.exports = { tokenAddresses, fantomABI };
