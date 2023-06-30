import React from 'react';
import Logo from "./open-book.png";
import { Link, NavLink } from 'react-router-dom';
import { SiBookstack } from 'react-icons/si';
import { useSelector } from "react-redux";

function NavBar() {

  const {cart} = useSelector((state) => state);

  return (
    <nav className="flex flex-row justify-between items-center bg-gray-900 px-4 py-3">
    <Link to="/">
    <div className="flex items-center space-x-3">
    
        <img src = {Logo} className="w-10 md:w-12" alt="logo" />
        <h1 className="text-lg md:text-2xl font-bold text-white uppercase tracking-widest md:block hidden">
          <span className="text-blue-500">Library</span>Pro
        </h1>
    </div>
    </Link> 
  <div className="flex items-center space-x-6">
    <Link to="/books" className="font-medium text-white text-2xl hover:text-blue-500 transition-colors duration-300">
      Books
    </Link>
    <Link to="/favourites" className="font-medium text-white text-2xl hover:text-blue-500 transition-colors duration-300">
      Favourites
    </Link>
    <NavLink to="/cart">
          <div className="relative">
              <SiBookstack className="text-3xl text-white"/> 
              {
                    cart.length > 0 &&
                    <span
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white" 
                    >{cart.length}</span>
              }
          </div>
    </NavLink>
  </div>
  </nav>

  )
}

export default NavBar