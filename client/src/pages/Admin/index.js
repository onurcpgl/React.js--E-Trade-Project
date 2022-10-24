import React from 'react'
import style from "./styles.module.css";
import {
    NavLink,
    
  } from "react-router-dom";


function Admin() {
  

  return (

    <div>

        <nav>
            <ul className={style.admin}>
                <li className={style.admin}>
                    <NavLink to="orders">
                        Orders
                    </NavLink>
                </li>
                <li className={style.admin}>
                    <NavLink to="products">
                        Products
                    </NavLink>
                </li>
                
            </ul>
        </nav>

       

    </div>

  )
}

export default Admin