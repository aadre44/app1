import React, {useState} from "react";
import "./Search.css";
import ChartLine from "../../Components/ChartLine/ChartLine";
import TokenSearch from "../../Components/TokenSearch/TokenSearch";
import {getMyTokenData, getHistData} from "../../Helper/AccountSetup";
import * as FiIcons from "react-icons/fi";

function lookUpHistoricalData(days){

    let hist = getHistData("bitcoin", days);
    return hist;
}

// Need to make it so on click of the coincard in
function Search({account, accountBalance}){

    const [coinHistory, setCoinHistory] = useState();
    
    

    

    return(
        <div className="SearchContainer">
            <div className="ContentHeader">
                <FiIcons.FiActivity/>
                <p>Search</p>
            </div>
            <div className = "SearchHeader">
        
                <h4>Historical Price Data</h4>
                <form action="">
                    <input type="text" placeholder="Search" />
                </form>

            </div>
           
            <ChartLine 
              historicalData ={coinHistory}
              type = "big"
            />
            <TokenSearch/>
        </div>
    );
}
export default Search;