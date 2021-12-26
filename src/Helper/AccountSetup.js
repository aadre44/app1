import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Console } from "console";

//Use this to obtain all the coins' id in order to make API calls
//https://api.coingecko.com/api/v3/coins/list?include_platform=true
// Search info for Coin using Contract address
//https://api.coingecko.com/api/v3/coins/ethereum/contract/0x990f341946a3fdb507ae7e52d17851b87168017c/market_chart/?vs_currency=usd&days=1
//https://api.coingecko.com/api/v3/coins/ethereum/contract/0x990f341946a3fdb507ae7e52d17851b87168017c

async function getMyTokenData(myTokens) {
  console.log("Starting getMyTokenData Getting Full token Data:");
  var allTokenData = [];
  var count = 0;

  console.log("getMyTokenData Function parameter myTokens: " + myTokens);
  let pendingRequests = [];

  for (let i = 0; i < myTokens.length; i++) {
    let token = myTokens[i];
    if (count >= 50) break;
    count++;
    console.log("Token to fetch for : " + token);

    let url =
      "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
      token.address;
    console.log("url: " + url);

    let result = axios
      .get(url)
      .then((res) => {
        allTokenData.push([token, res.data]);
        console.log("Result of fatch getTokenData: " + allTokenData);
      })
      .catch((error) =>
        console.log(
          error + "Error fetching data for the getMyTokenData funciton"
        )
      );
    pendingRequests.push(result);
  }
  await Promise.allSettled(pendingRequests);

  console.log("Result of getTokenData: " + allTokenData);

  return allTokenData;
}

export default getMyTokenData;
