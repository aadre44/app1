import React, {Component, useState, useEffect} from "react";
import CoinCard from "./CoinCard";
import Coin from "../Coin";
import axios from "axios";

function TokenSearch(){

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect( () =>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=3&sparkline=true'). then(res =>{
            setCoins(res.data);
            
        }).catch(error=> console.log(error))
    }, []);

    const filteredCoins= coins.filter(coin => {
        
        return coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
    
    });
    const handleChange= e => {
        setSearch(e.target.value);
    };

    return(

        <div className="App3">
                <div className='coin-search'>
                    <h1 className='coin-text'>Search a currency</h1>
                    <form>
                    <input
                        className='coin-input'
                        type='text'
                        onChange={handleChange}
                        placeholder='Search'/>
                    </form>
                </div>
                {filteredCoins.map(coin =>{
                    return (
                        <CoinCard
                            key={coin.id}
                            name={coin.name}
                            price={coin.current_price}
                            symbol={coin.symbol}
                            marketcap={coin.total_volume}
                            volume={coin.market_cap}
                            image={coin.image}
                            priceChange={coin.price_change_percentage_24h}
                        />
                    );
                })}
            </div>
    )
}
export default TokenSearch