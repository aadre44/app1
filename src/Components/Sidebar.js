import React, {Component, useState} from 'react'
import {SidebarData} from "./SidebarData"
import './../Style/Sidebar.css'
import * as FiIcons from "react-icons/fi";
import { Link } from 'react-router-dom';

function Sidebar(){

    const [homeActive, setHomeActive] = useState(true);
    const [walletActive, setWalletActive] = useState(false);
    const [portfolioActive, setPortfolioActive] = useState(false);

    const toggleIcon= (icon) =>{
        console.log('toggling icon: '+icon);
        switch(icon){

            case 'home':
                setHomeActive(true);
                setWalletActive(false);
                setPortfolioActive(false);
                break;
            case 'wallet':
                setHomeActive(false);
                setWalletActive(true);
                setPortfolioActive(false);
                break;
            case 'portfolio':
                setHomeActive(false);
                setWalletActive(false);
                setPortfolioActive(true);
                break
            Default:
                break;
        }
    }


    return(
        <div className='Sidebar'>
            <div className="SiteIcon">
                <FiIcons.FiAperture size={40}/>
            </div>
        
            <div className="SidebarList">
                <ul>
                    <li className ={homeActive ? 'Selected': ''} id="home"> 
                        <button onClick={() => toggleIcon('home')}><FiIcons.FiHome/></button>
                    </li>
                    <li className ={portfolioActive ? 'Selected': ''} id="Portfolio">
                        <button onClick={() => toggleIcon('portfolio')}><FiIcons.FiActivity/></button>
                    </li>
                    <li className ={walletActive ? 'Selected': ''} id="Wallet">
                        <button onClick={() => toggleIcon('wallet')}><FiIcons.FiDollarSign/></button>
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default Sidebar

/*
 {SidebarData.map((val, key) => {
                        return(
                            <li key={key} >
                                <div>
                                   <button >{val.icon} </button>                               
                                   
                                </div>    
                            </li>
                        )
                    })}
*/