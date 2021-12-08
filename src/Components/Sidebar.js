import React, {Component} from 'react'
import {SidebarData} from "./SidebarData"

function Sidebar(){

    return(
        <div className="Sidebar">
        <ul>
            {SidebarData.map((val, key) => {
                return(
                    <li key={key}>
                        {" "}
                        <div>{val.icon}</div>{" "}
                        <div>
                            {val.title}
                        </div>    
                    </li>
                )
            })}
        </ul>

        </div>
    )

}

export default Sidebar