import React from "react";
import "./../Style/Wallet.css"

const coins = [
    { symbol: "ADA", amount: 200, color: "#0033ad", inUSD: 1.48 },
    { symbol: "SOL", amount: 5, color: "#00ffbd", inUSD: 37.6 },
    { symbol: "BTC", amount: 0.005, color: "#F7931A", inUSD: 37363 },
  ];

function Wallet({type = 1}){


    if(type==1){

        return (

            <div className="Container">
    
                <ul className="WalletList">
    
                {coins.map((coin)=>{
    
                    return(
    
                        <li style= {{color: coin.color}}>

                            {`${coin.symbol}  `}
                            {`${coin.amount} `}
                            {coin.inUSD}
    
                            
                        </li>
                    )
    
                })}
    
                </ul>
    
            </div>
        )
    }else {

        return (

            <div>
    
                <ul>
    
                {coins.map((coin)=>{
    
                    return(
    
                        <li >
                            <div>
                                {`${coin.symbol}  `}
                                {coin.amount}
    
                            </div>
                        </li>
                    )
    
                })}
    
                </ul>
    
            </div>
        )
    }
    
}

export default Wallet