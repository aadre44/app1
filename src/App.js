
import { render } from 'react-dom';
import React, {Component, useState, useEffect} from 'react'
import './App.css'
import Web3 from 'web3'
import {injected} from "./connectors.js"
import {useWeb3React, Web3ReactProvider} from '@web3-react/core'
import  {tokenAddresses, erc20ABI} from './tokens.js'
import Sidebar from './Components/Sidebar.js'
import CoinCard from './Components/CoinCard';
import Display from './Components/Display';
import axios from 'axios'
import { convertTypeAcquisitionFromJson } from 'typescript';
import Coin from './Coin';
import TokenSearch from './Components/TokenSearch';
import PieChart from './PieChart';


class App extends React.Component{
    
    async loadBlockchainData(){
        var tokenABI = erc20ABI
        this.setState({tokenABI})
        const web3 = window.web3
        // This gets a list of the accounts for this wallet
        const account = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(account.toString());
        console.log("Account: "+account+" Balance: "+balance);
        this.setState({account: account});
        console.log("state acct: "+ this.state.account);
        const tokenInst = new web3.eth.Contract(erc20ABI, "0x990f341946A3fdB507aE7e52d17851B87168017c");
        var strongBal = await tokenInst.methods.balanceOf(account.toString()).call();
        strongBal /= 10
        console.log("strong bal: "+strongBal);
        this.getTokens();
        this.render();
    }
    async loadWeb3(){
        console.log("loading web3");
        if(window.ethereum){
            
            window.web3 = new Web3(window.ethereum)
            
            await window.ethereum.enable()
            
        }else if(window.web3 ){

            window.web3 = new Web3(window.web3.currentProvider)

        }else {

            window.alert('no ethereum browser detected')
        }
    } 
    async tryConnect(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }else if(window.web3){

            window.web3 = new Web3(window.web3.currentProvider)

        }else{
            window.alert("no ethereum")
        }
    }
    async getTokens(){
        const web3 = window.web3
        const ourTokens = []
        console.log("looping through tokens for: "+ this.state.account.toString())
        for(let addressX of tokenAddresses){
            console.log("hi");
            var tokenInst = new web3.eth.Contract(this.state.tokenABI, addressX)
            var bal = await tokenInst.methods.balanceOf(this.state.account.toString()).call()
            console.log("Address: "+addressX+" bal: "+bal)
            if(bal ==0 || true) ourTokens.push(addressX)

        }
        this.setState({tokens: ourTokens})
        console.log("Tokens: "+this.state.tokens+" OUR "+ourTokens)
    }



    constructor(props){
        super(props)

        this.state = {
            account:'',
            metaMaskInstalled:'',
            tokens:["Start"],
            tokenABI:'',

        } 

    }


    render(){

        return(            
            <div className="App">
                <Sidebar/>
                <div className="Spacer"></div>
                <PieChart/>
                <TokenSearch/>
                
            </div>
        )
    }

}
export default App
