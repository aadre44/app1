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

async function getHistData(coinName, days){

  console.log("GETING HISTORICAL DATA FOR "+coinName);
  //https://api.coingecko.com/api/v3/coins/bitcoin/history?date=28-12-2021
  let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
  let currentDate = new Date();
  let month = currentDate.getMonth()+1;
  let day = currentDate.getDay()+1;
  let year = currentDate.getFullYear();
  let prices = [];
  let hist = [];
 
  
  for(let i = 0; i < days; i++){
    let url = "https://api.coingecko.com/api/v3/coins/"+coinName+"/history?date="+day+"-"+month+"-"+year;
    

    day--;
    if(day<=0){
      month--;
      if(month <= 0)month = 12;
      if(thirtyOne.includes(month)) day = 31;
      else if(month == 2) day = 28;
      else day = 30;
    }

    let result = axios
    .get(url)
    .then((res)=>{
      prices.push(res.data.market_data.current_price.usd);
      console.log(res.data);
    })
    .catch((error) =>
      console.log(
      error + "Error fetching data for the getHistoricalData funciton"
    ));
    hist.push(result);

  }
  await Promise.allSettled(hist);

  return prices;
}

export {getMyTokenData, getHistData};
