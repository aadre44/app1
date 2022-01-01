import React, {Component, useState, useEffect} from "react";
import "./Dashboard.css";
import { tokenAddresses, erc20ABI } from "../../Helper/TokenData/erc20Tokens.js";
import Sidebar from "../../Components/Sidebar/Sidebar.js";
import CoinCard from "../../Components/CoinCard/CoinCard";
import Display from "../../Components/Display/Display";
import { convertTypeAcquisitionFromJson, setConstantValue } from "typescript";
import PieChart from "../../Components/Piechart/PieChart";
import Wallet from "../../Components/Wallet/Wallet";
import * as FiIcons from "react-icons/fi";
import ChartLine from "../../Components/ChartLine/ChartLine"
import {Route,Navigate} from "react-router-dom";



function Dashboard({account, tokens, totalBal, fullTokens, totalBalHist}){

    
   let  state = {
        account: "",
        metaMaskInstalled: "",
        tokens: [],
        tokenABI: erc20ABI,
        totalBal: "",
        myTokenList: [],
        fullTokens: [],
        fiat: "usd",
        totalBalHist:[]
    };


      return(
        <div className="DashboardContainer">
            <div className="Content">
                <div className="ContentHeader">
                    <FiIcons.FiHome />
                    <p>Dashboard</p>
                </div>
                <div className="Dashboard">
                    <div className="DashTitle">
                        <h4>Total Net Worth</h4>
                        <p> Account: {account}</p>
                    </div>
                    
                    <p>${Math.round(((totalBal+Number.EPSILON)*100))/100}</p>
                    <ChartLine 
                    historicalData ={totalBalHist}
                    />
                <div>
                    <div className="TabHeader">
                    <button>Wallet</button>
                    <button>NFTs</button>
                    </div>
                    {fullTokens.map((coin) => {
                    return (
                        <CoinCard
                        key={coin[1].id}
                        name={coin[1].name}
                        price={coin[1].market_data.current_price.usd}
                        image={coin[1].image.small}
                        symbol={coin[1].symbol}
                        change={coin[1].market_data.ath_change_percentage.usd}
                        amount={coin[0].balance} 
                        />   
                    );
                    })}
                </div>
                </div>
            </div>
      </div>
      );
}
export default Dashboard;