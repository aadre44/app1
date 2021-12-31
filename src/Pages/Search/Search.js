import React, {useState} from "react";
import "./Search.css";
import ChartLine from "../../Components/ChartLine/ChartLine";
import TokenSearch from "../../Components/TokenSearch/TokenSearch";
import {getMyTokenData, getHistData} from "../../Helper/AccountSetup";

function lookUpHistoricalData(days){

    let hist = getHistData("bitcoin", days);
    return hist;
}

// Need to make it so on click of the coincard in
function Search({account, accountBalance}){

    const [coinHistory, setCoinHistory] = useState();
    
    

    

    return(
        <div>
            <div className = "SearchHeader">
                <form action="">
                    <input type="text" placeholder="Search" />
                </form>
            </div>
            <div className="Title">
                <h4>Total Net Worth</h4>
                <p> Account:{account}</p>
            </div>
            
            <p>${accountBalance}</p>
            <ChartLine 
              historicalData ={coinHistory}
            />
            <TokenSearch/>
        </div>
    );
}
export default Search;