import React, { useState, useEffect, Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import "./CoinCard.css";
import ChartLine from "../ChartLine/ChartLine";
/*
https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=3&sparkline=true
*/

function CoinCard({ name, symbol, price, change, image, amount, type }) {
  switch (type) {
    case "mini":
      return (
        <div className="CoinCardMini">
          <div className="CoinIcon">
            <img src={image} alt="crypto icon" width="40" height="40" />
            <p className="price">${price}</p>
          </div>
          <div className="NameTag">
            <p className="name">{name}</p>
            <p className="symbol">{symbol}</p>
          </div>
          <div className="BalanceTag">
            <p className="amountValue">${amount * price}</p>
            <p className="amount">{amount}</p>
          </div>
        </div>
      );
      break;
    case "long":
      return (
        <div className="CoinCardLong">
          <div className="CoinIcon">
            <img src={image} alt="crypto icon" width="50" height="50" />
          </div>
          <div className="NameTag">
            <p className="name">{name}</p>
            <p className="symbol">{symbol}</p>
          </div>
          <div className="BalanceTag">
            <p className="amountValue">${amount * price}</p>
            <p className="amount">{amount}</p>
          </div>
          <div className="PriceTag">
            <p className="price">${price}</p>
            <p
              className="athChange"
              style={change > 0 ? { color: "green" } : { color: "red" }}
            >
              {change}
            </p>
          </div>
          <div className="Chart24h">
              <ChartLine type = "mini"/>
          </div>
        </div>
      );
      break;
      case "wombo":
            return(

                <div className="WomboCoinCard">
                    
                    <div className="CoinIcon">
                        <img src={image} alt="crypto icon"  width="50" height = "50" />
                    </div>
                    <div className="NameTag">
                        <p className="name">{name}</p>
                        <p className="symbol">{symbol}</p>
                    </div>
                    <div className="BalanceTag">
                        <p className="amountValue">${amount*price}</p>
                        <p className="amount">{amount}</p>
                    </div>
                    <div className="PriceTag">
                        <p className="price">${price}</p>
                        <p className="athChange" style = {change >0 ? {color: 'green'} : {color: 'red'}}>{change}</p>
                    </div>
                    
                </div>
            )
            break;
    default:
        
      return (
        <div className="CoinCard">
          <div className="CoinIcon">
            <img src={image} alt="crypto icon" width="50" height="50" />
          </div>
          <div className="NameTag">
            <p className="name">{name}</p>
            <p className="symbol">{symbol}</p>
          </div>
          <div className="BalanceTag">
            <p className="amountValue">${amount * price}</p>
            <p className="amount">{amount}</p>
          </div>
          <div className="PriceTag">
            <p className="price">${price}</p>
            <p
              className="athChange"
              style={change > 0 ? { color: "green" } : { color: "red" }}
            >
              {change}
            </p>
          </div>
        </div>
      );
      break;
      
  }
}

export default CoinCard;
