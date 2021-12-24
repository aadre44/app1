import  React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import { Console } from 'console';


//Use this to obtain all the coins' id in order to make API calls
//https://api.coingecko.com/api/v3/coins/list?include_platform=true
// Search info for Coin using Contract address
//https://api.coingecko.com/api/v3/coins/ethereum/contract/0x990f341946a3fdb507ae7e52d17851b87168017c/market_chart/?vs_currency=usd&days=1
//https://api.coingecko.com/api/v3/coins/ethereum/contract/0x990f341946a3fdb507ae7e52d17851b87168017c


function setUp(){

}

function loadWallet(){



}

async function getMyTokenData(myTokens){

    console.log("Starting getMyTokenData Getting Full token Data:");
    var allTokenData = [];
    var count = 0;
    
    console.log("getMyTokenData Function parameter myTokens: "+myTokens)
    let pendingRequests = []; 

    for(let i = 0; i< myTokens.length; i++){
        let token = myTokens[i];
        if(count >= 50) break;
        count++;
        console.log("Token to fetch for : "+token)
        let url = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/'+token[0]
        console.log("url: "+url)

        let result = axios.get(url).then(res =>{
            allTokenData.push([token[0], res.data]); 
            console.log("Result of fatch getTokenData: "+allTokenData);

        }).catch(error=> console.log(error+"Error fetching data for the getMyTokenData funciton"))
        pendingRequests.push(result);
    }
    await Promise.allSettled(pendingRequests);
    
    console.log("Result of getTokenData: "+allTokenData);

    return allTokenData;
        
    
}
function getMyTokenData2(myTokens){

    console.log("Getting Full token Data:");
    var allTokenData = [];
    var count = 0;
    
    console.log("getMyTokenData Function parameter myTokens: "+myTokens)
    useEffect( () =>{
        for(let i = 0; i< myTokens.length; i++){
            let token = myTokens[i];
            if(count >= 50) break;
            count++;
            console.log("Token to fetch for : "+token)
            let url = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/'+token[0]
            console.log("url: "+url)
                    
            axios.get(url).then(res =>{
                allTokenData.push([token[0], res.data]); 
                console.log("Result of fatch getTokenData: "+allTokenData);
            }).catch(error=> console.log(error+"Error fetching data for the getMyTokenData funciton"))
        
        } 
    }, []);
    
    console.log("Result of getTokenData: "+allTokenData);
    return allTokenData;
        
    
}


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
                        <div></div>
                        /*
                        <CoinCard
                            key={coin.id}
                            name={coin.name}
                            price={coin.current_price}
                            symbol={coin.symbol}
                            marketcap={coin.total_volume}
                            volume={coin.market_cap}
                            image={coin.image}
                            priceChange={coin.price_change_percentage_24h}
                        />*/
                    );
                })}
            </div>
    )
}


export default getMyTokenData