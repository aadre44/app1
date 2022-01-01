import React, {Component, useState} from 'react'
import {SidebarData} from "./SidebarData"
import './Sidebar.css'
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
                        <Link to="/" onClick={() => toggleIcon('home')}><FiIcons.FiHome/></Link>
                    </li>
                    <li className ={portfolioActive ? 'Selected': ''} id="Portfolio">
                        <Link to= "/Search"onClick={() => toggleIcon('portfolio')}><FiIcons.FiActivity/></Link>
                    </li>
                    <li className ={walletActive ? 'Selected': ''} id="Wallet">
                        <Link to="/Wallet" onClick={() => toggleIcon('wallet')}><FiIcons.FiDollarSign/></Link>
                        
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