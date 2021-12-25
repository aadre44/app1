import React, {useState, useEffect,Component} from "react";
import { render } from "react-dom";
import axios from "axios";
import './CoinCard.css';
/*
https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=3&sparkline=true
*/

function CoinCard ({name, symbol, price, volume, image}){
    return(

        <div className="CoinCard">
            
            <div className="CoinIcon">
                <img src={image} alt="crypto icon"  width="50" height = "50" />
            </div>
            <div className="NameTag">
                <p>{name}</p>
                <p>{symbol}</p>
            </div>
            <div className="Price">
                <p>{price}</p>
                <p>{volume}</p>
            </div>
            
        </div>
    )
}

export default CoinCard