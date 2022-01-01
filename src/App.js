import { render } from "react-dom";
import React, { Component, useState, useEffect, useRef } from "react";
import "./App.css";
import Web3 from "web3";
import { injected } from "./connectors.js";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import * as eth from "./Helper/TokenData/erc20Tokens.js";
import * as ftm from "./Helper/TokenData/FantomTokens.js";
import * as avax from "./Helper/TokenData/AvalancheTokens"
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
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      account: "",
      metaMaskInstalled: "",
      tokens: [],
      tokenABI: {},
      totalBal: "",
      myTokenList: [],
      fullTokens: [],
      fiat: "usd",
      totalBalHist:[],
      chains:[
        [eth.ABI, eth.tokenAddresses], 
        [ftm.ABI, ftm.tokenAddresses],
        [avax.ABI, avax.tokenAddresses]
      ],
      chainsObject:{
        eth: {
          ABI: eth.ABI,
          tokenAddresses: eth.tokenAddresses
        },
        ftm: {
          ABI: ftm.ABI,
          tokenAddresses: ftm.tokenAddresses
        },
        avax: {
          ABI: avax.ABI,
          tokenAddresses: avax.tokenAddresses
        },
      },
      ABI: [eth.ABI, ftm.ABI]
    };

  }
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.getChartHistory();
  }
  async loadBlockchainData() {
    this.setState({ tokenABI: eth.ABI });
    const web3 = window.web3;
    // This gets a list of the accounts for this wallet
    const account = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(account.toString());
    console.log("Account: " + account + " Balance: " + balance);
    this.state.totalBal = (balance == 0 ?(balance * Math.pow(10, 18)) :(balance * Math.pow(10, 18)).toFixed(2));
    this.setState({ account: account });
    console.log("state acct: " + this.state.account);
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

    /*
    for(let chain of this.state.chains){
      console.log("chain: "+chain);
  
      for (let address of chain[1]) {
        var tokenInst = new web3.eth.Contract(chain[0], address);
        var bal = await tokenInst.methods
          .balanceOf(this.state.account.toString())
          .call();
        if (bal > 0){
        // this.state.myTokenList.push([address, bal * Math.pow(10, 18)]);
          this.state.myTokenList.push({address: address, balance: bal * Math.pow(10, 18), color: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`});
        } 
      }
    }*/

    for (let address of this.state.chainsObject.eth.tokenAddresses) {
      var tokenInst = new web3.eth.Contract(this.state.chainsObject.eth.ABI, address);
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
  async getChartHistory(){
    let hist = await getHistData("bitcoin", 10);
    this.setState({totalBalHist: hist});
    this.render()
  }

  render() {
    return (
      <div className="App">
        
          <BrowserRouter>
            <Sidebar/>
            <Routes>

              <Route exact path="/" element ={<Dashboard fullTokens = {this.state.fullTokens} account = {this.state.account}/>} />
              <Route exact path="/Search" element = {<Search/>}/>
              <Route exact path="/Wallet"/>

            </Routes>
          
          
          </BrowserRouter>

        <div className="SidePanel">
          <PieChart 
            key = {1}
            coinList = {this.state.fullTokens}
          />
          <Wallet 
            key= {2}
            coins = {this.state.fullTokens}
          />
        </div>
      </div>
    );
  }
}
export default App;
