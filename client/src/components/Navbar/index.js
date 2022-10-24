import React from 'react'
import style from "./styles.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from '@chakra-ui/react'

import { useAuth } from "../../context/AuthContext";
import { useBasket } from "../../context/BasketContext";

function Navbar() {

  const { loggedIn, user } = useAuth();

  const { items } = useBasket();


  return (
    <div>
      <nav className={style.nav}>
        <div className={style.left}>
            <div className={style.logo}>
                 <NavLink to="/">eCommerce</NavLink>
            </div>

            <ul className={style.menu}>
                <li>
                    <NavLink to="product">Products</NavLink>
                </li>
            </ul>
        </div>

        <div className={style.right}>
          {
            !loggedIn && (
              <>
                <NavLink to="/signin">
                  <Button colorScheme='yellow'>Login</Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button colorScheme='yellow'>Register</Button>
                </NavLink>
              </>
            ) 
          }
          {
            loggedIn && 
            <>
              {
                items.length > 0 &&
                  <NavLink to="/basket">
                    <Button colorScheme="orange" variant="outline">
                      Basket ({items.length})
                    </Button>
                  </NavLink>
              }

              {
                user?.role === "admin" && (

                  <NavLink to="/admin">
                    <Button colorScheme="red" variant="ghost">
                      Admin
                    </Button>
                  </NavLink>

                )
              }

              <NavLink to="/profile">
                  <Button colorScheme='yellow'>Profile</Button>
              </NavLink>
            </>
          } 
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar
