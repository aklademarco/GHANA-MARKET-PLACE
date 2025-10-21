import React from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router";
import { Smile, Search, ShoppingCart } from "lucide-react";


const Navbar = () => {
  return (
    <div className=" flex items-center justify-between py-5 font-sans">
      <img
        src={assets.logo}
        alt="Ghana Market Place Logo"
        className="h-12 w-auto"
      />
      <ul className="hidden sm:flex gap-5 text-mdf text-gray-600">
        <NavLink to="/" className="flex flex-col items-center gap1">
          <p>HOME</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap1">
          <p>COLLECTION</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap1">
          <p>ABOUT</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap1">
          <p>CONTACT</p>
          <hr className=" w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-16">
        <Search className="text-gray-500" size={24} />

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
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
