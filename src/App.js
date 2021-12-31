import { render } from "react-dom";
import React, { Component, useState, useEffect, useRef } from "react";
import "./App.css";
import Web3 from "web3";
import { injected } from "./connectors.js";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { tokenAddresses, erc20ABI } from "./Helper/TokenData/erc20Tokens.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import CoinCard from "./Components/CoinCard/CoinCard";
import Display from "./Components/Display/Display";
import axios from "axios";
import { convertTypeAcquisitionFromJson, setConstantValue } from "typescript";
import PieChart from "./Components/Piechart/PieChart";
import Wallet from "./Components/Wallet/Wallet";
import {getMyTokenData, getHistData} from "./Helper/AccountSetup";
import * as FiIcons from "react-icons/fi";
import TokenSearch from "./Components/TokenSearch/TokenSearch";
import { Chart } from "react-chartjs-2";
import ChartLine from "./Components/ChartLine/ChartLine"
import Search from "./Pages/Search/Search";

class App extends React.Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.getChartHistory();
  }
  async loadBlockchainData() {
    var tokenABI = erc20ABI;
    this.setState({ tokenABI });
    const web3 = window.web3;
    // This gets a list of the accounts for this wallet
    const account = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(account.toString());
    console.log("Account: " + account + " Balance: " + balance);
    this.state.totalBal = (balance == 0 ?(balance * Math.pow(10, 18)) :(balance * Math.pow(10, 18)).toFixed(2));
    this.setState({ account: account });
    console.log("state acct: " + this.state.account);
    const tokenInst = new web3.eth.Contract(
      erc20ABI,
      "0x990f341946A3fdB507aE7e52d17851B87168017c"
    );
    const currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    this.state.totalBalHist.push({balance: this.state.totalBal, date: datetime})
    this.getTokens();
    this.render();
  }
  async loadWeb3() {
    console.log("loading web3");
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("no ethereum browser detected");
    }
  }
  async tryConnect() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("no ethereum");
    }
  }

  async getTokens() {
    const web3 = window.web3;

    for (let address of tokenAddresses) {
      var tokenInst = new web3.eth.Contract(erc20ABI, address);
      var bal = await tokenInst.methods
        .balanceOf(this.state.account.toString())
        .call();
      if (bal > 0){
       // this.state.myTokenList.push([address, bal * Math.pow(10, 18)]);
        this.state.myTokenList.push({address: address, balance: bal * Math.pow(10, 18), color: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`});
      } 
    }
    let tokens = this.state.myTokenList;
    let data = await getMyTokenData(tokens);

    this.setState({ fullTokens: data });
    console.log(this.state.fullTokens);
  }

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
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

  }

  async getChartHistory(){
    let hist = await getHistData("bitcoin", 10);
    this.setState({totalBalHist: hist});
    this.render()
  }

  render() {
    return (
      <div className="App">
        <Sidebar />
        <div className="Content">
          <div className="ContentHeader">
            <FiIcons.FiHome />
            <p>Dashboard</p>
          </div>
          <div className="Dashboard">
            <div className="DashTitle">
                <h4>Total Net Worth</h4>
                <p> Account: {this.state.account}</p>
            </div>
            
            <p>${Math.round(((this.state.totalBal+Number.EPSILON)*100))/100}</p>
            <ChartLine 
              historicalData ={this.state.totalBalHist}
            />

          
          <div>
            <div className="TabHeader">
              <button>Wallet</button>
              <button>NFTs</button>
            </div>
            {this.state.fullTokens.map((coin) => {
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
          <Search/>
        </div>
        <div className="SidePanel">
          <PieChart 
            key = {1}
            coinList = {this.state.fullTokens}
          />
          <Wallet 
            key= {1}
            coins = {this.state.fullTokens}
          />
        </div>
      </div>
    );
  }
}
export default App;
