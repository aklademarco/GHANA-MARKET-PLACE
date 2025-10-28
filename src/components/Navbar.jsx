import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { Smile, Search, ShoppingCart, Menu, X } from "lucide-react";
import { shopContext } from "../context/shopContext";



const Navbar = () => {
  const {setShowSearch} = useContext(shopContext);
  const [visible, setVisible] = useState(false);
  return (
    <div className=" flex items-center justify-between py-5 font-sans relative">
      <img
        src={assets.logo}
        alt="Ghana Market Place Logo"
        className="h-12 w-auto"
      />
      <ul className="hidden sm:flex gap-5 text-md text-gray-600">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <Search onClick={() => setShowSearch(true)} className="text-gray-500" size={24} />

        <div className="group relative">
          <Smile className="text-gray-500" size={24} />
          <div className=" group-hover:block hidden absolute dropdown-men right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <ShoppingCart className="text-gray-500" size={24} />
          <p className=" absolute right-[-5px] bottom:-4px w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            5
          </p>
        </Link>
        <Menu
          onClick={() => setVisible(true)}
          className="cursor-pointer sm:hidden"
        />
        <div
          className={`absolute  top-0 right-0  bg-white transition-all ${
            visible ? "w-full sm:w-96" : "w-0"
          } overflow-y-auto z-50 `}
        >
          <div className=" flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <X className="rotate-180 text-red-500" />
              <p>Back</p>
            </div>
            
              <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6" to="/">HOME</NavLink>
              <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 " to="/collections">COLLECTION</NavLink>
              <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6" to="/about">ABOUT</NavLink>
              <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 " to="/contact">CONTACT</NavLink>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
