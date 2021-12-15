import React, {Component} from 'react'
import {SidebarData} from "./SidebarData"
import './../Style/Sidebar.css'

function Sidebar(){

    return(
        <div className='Sidebar'>
            <div>
                <h1>ICON HERE</h1>
            </div>
        
            <div className="SidebarList">
                <ul>
                    {SidebarData.map((val, key) => {
                        return(
                            <li key={key}>
                                <div>
                                    {val.title}
                                </div>    
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )

}

export default Sidebar