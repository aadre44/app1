
import { render } from 'react-dom';
import React, {Component, useState, useEffect} from 'react'
import './App.css'
import Web3 from 'web3'
import {injected} from "./connectors.js"
import {useWeb3React, Web3ReactProvider} from '@web3-react/core'
import  {tokenAddresses, erc20ABI} from './Helper/erc20Tokens.js'
import Sidebar from './Components/Sidebar.js'
import CoinCard from './Components/CoinCard';
import Display from './Components/Display';
import axios from 'axios'
import { convertTypeAcquisitionFromJson, setConstantValue } from 'typescript';
import Coin from './Coin';
import TokenSearch from './Components/TokenSearch';
import PieChart from './Components/PieChart';
import Wallet from './Components/Wallet';
import { setUncaughtExceptionCaptureCallback } from 'process';
import getMyTokenData from './Helper/AccountSetup';
import * as FiIcons from "react-icons/fi";


class App extends React.Component{
    

    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    async loadBlockchainData(){
        var tokenABI = erc20ABI
        this.setState({tokenABI})
        const web3 = window.web3
        // This gets a list of the accounts for this wallet
        const account = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(account.toString());
        console.log("Account: "+account+" Balance: "+balance);
        this.state.totalBal = balance* Math.pow(10, 18);
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
    /*
    getTokens()
    Loop through list of token addresses and check the balance of that token for the given address
    */
    async getTokens(){
        const web3 = window.web3
 
       // console.log("looping through tokens for: "+ this.state.account.toString())
       // console.log("looping through these addresses: "+tokenAddresses)
        for(let address of tokenAddresses){
            var tokenInst = new web3.eth.Contract(erc20ABI, address)
         //   console.log("Focusing on address: "+address)
            //need to check if the wallet is connected to the network that matches the ABI for this to work
            var bal = await tokenInst.methods.balanceOf(this.state.account.toString()).call()
         //   console.log("Address: "+address+" bal: "+bal)
          //  if(bal ==0 || true) ourTokens.push(address)
            if(bal > 0) this.state.myTokenList.push([address, bal* Math.pow(10, 18)]);

        }
     //   console.log("My Wallet with balances: "+this.state.myTokenList)
        let tokens = this.state.myTokenList;
        this.setState({fullTokens: getMyTokenData(tokens)});
        console.log(this.state.fullTokens)

    }

    getMyTokenData2(myTokens){

        console.log("Getting Full token Data:");
        var allTokenData = [];
        var count = 0;
    
        console.log("getMyTokenData Function parameter myTokens: "+myTokens)
    
        for(let i = 0; i< myTokens.length; i++){
            let token = myTokens[i];
            if(count >= 50) break;
            count++;
                console.log("Token to fetch for : "+token)
                let url = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/'+token[0]
                console.log("url: "+url)
                
                axios.get(url).then(res =>{
                    allTokenData.push([token[0], res.data]);               
                }).catch(error=> console.log(error+"Error fetching data for the getMyTokenData funciton"))
               
      
        }
    
        console.log("Result of getTokenData: "+allTokenData);
        return allTokenData;
        
    }
    constructor(props){
        super(props)

        this.state = {
            account:'',
            metaMaskInstalled:'',
            tokens:["Start"],
            tokenABI: erc20ABI,
            totalBal:'',
            myTokenList:[],
            fullTokens:['start']
        } 

    }


    render(){

        return(            
            <div className="App">
                <Sidebar/>
                <div className= 'Content'>
                    <div className= 'ContentHeader'>
                        <FiIcons.FiHome/>
                        <p>Dashboard</p>
                    </div>
                    <div>
                        <h1>Total Net Worth</h1>
                        <p>${this.state.totalBal.toString()}</p>
                    </div>
                    <div>
                        <div className='TabHeader'>
                            <button>Wallet</button>
                            <button>NFTs</button>
                        </div>
                        {console.log("my token list: "+this.state.myTokenList)}
                        {this.state.myTokenList.map((row)=>{
                                console.log("THis is the row: "+row)
                                return (
                                    <CoinCard
                                        key={row[0]}
                                        name={row[0]}
                                        price={row[1]}
                                    />
                                );
                                


                            }
                        )}
                        {console.log("my full token list: "+this.state.fullTokens)}
                        {this.state.fullTokens.map((coin)=>{
                                console.log("THis is the full coin: "+coin)
                                console.log("Current Full Token list"+ this.state.fullTokens)
                                return (
                                    <CoinCard
                                        key={coin[1].id}
                                        name={coin[1].name}
                                        price={coin[1].price}
                                        symbol={coin[1].symbol}
                                    />
                                );


                            }
                        )}
                        {console.log("my full 2 token list: "+this.state.fullTokens)}
                    </div>
                </div>
                <div className= 'SidePanel'>
                    <PieChart/>
                    <Wallet/>
                </div>
                
                
            </div>

        )
    }

}
export default App
