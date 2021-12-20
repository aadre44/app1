import  React, {Component,useState, useEffect} from 'react';
import axios from 'axios';


//Use this to obtain all the coins' id in order to make API calls
//https://api.coingecko.com/api/v3/coins/list?include_platform=true
// Search info for Coin using Contract address
//https://api.coingecko.com/api/v3/coins/ethereum/contract/0x990f341946a3fdb507ae7e52d17851b87168017c/market_chart/?vs_currency=usd&days=1
//https://api.coingecko.com/api/v3/coins/ethereum/contract/0x990f341946a3fdb507ae7e52d17851b87168017c


function setUp(){

}

function loadWallet(){



}
function getMyTokenData(myTokens){

    const allTokenData = []
    var count = 0;

    console.log("getMyTokenData Function parameter myTokens: "+myTokens)

    for(var token in myTokens){
        if(count >= 50) break;
        count++;
            console.log("Token to fetch for : "+myTokens[0])
            let url = 'https://api.coingecko.com/api/v3/coins/ethereum/contract/'+myTokens[0]
            console.log("url: "+url)
            //useEffect( () =>{
                axios.get(url).then(res =>{
                    allTokenData.push([myTokens[0], res.data]);               
                }).catch(error=> console.log(error+"Error fetching data for the getMyTokenData funciton"))
           // }, []);
  
    }

    console.log(allTokenData.toString);
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