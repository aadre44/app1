
import { render } from 'react-dom';
import React, {Component} from 'react'
import './App.css'
import Web3 from 'web3'
import {injected} from "./connectors.js"
import {useWeb3React, Web3ReactProvider} from '@web3-react/core'
import  {tokenAddresses, erc20ABI} from './tokens.js'
import Sidebar from './Components/Sidebar.js'


class App extends React.Component{
 
    // const { active, account, library, connector, activate, deactivate} = useWeb3React()
    
    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }/**/

   async connectWallet(){
        const metaMaskInstalled = typeof window.ethereum !== 'undefined'
     //   this.setState({metaMaskInstalled: metaMaskInstalled})
        if(metaMaskInstalled){
            await this.loadWeb3()
            await this.loadBlockchainData() 
        }        
    }
    
   //var strongAddress = '0x990f341946A3fdB507aE7e52d17851B87168017c';
    
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
                <div>
                    <h1>Address: {this.state.account} </h1>
                    <button onClick={this.connectWallet}> Connect Wallet`</button>
                    <h1>Tokens: {this.state.tokens}</h1>
                </div>
            </div>
        )
    }

}
export default App
/*
const provider = await detectEthereumProvider();

if( provider){
    startApp(provider);
} else {
    console.log('Please install Metamask!');
}

if(!window.ethereum){

    return false;
}

*/