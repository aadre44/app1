import React from "react";


const Coin = ({
    name,
    price,
    symbol,
    marketcap,
    volume,
    image,
    priceChange
    }) => {
    return (
        
        <div className="CoinCard">
            
            <div>
                <img src={'./Icons/bitconIcon.png'} alt="crypto icon"/>
            </div>
            <div>
                <h2>token Name</h2>
                <h3>token Symbol</h3>
            </div>
            <div>
                <h2>Token Price</h2>
                <h3>Token detail</h3>
            </div>
            
        </div>
    );
}
export default Coin