import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Smile,
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Package,
  LogOut,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useStore } from "../context/store";
import { useCartStore } from "../context/cartStore";

const Navbar = () => {
  const setShowSearch = useStore((s) => s.setShowSearch);
  const cartItems = useCartStore((s) => s.cartItems);
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should come from your auth context/store
  const navigate = useNavigate();

  // Calculate cart count from cartItems
  const cartCount = Object.values(cartItems).reduce((total, sizes) => {
    return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
  }, 0);

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
        <Search
          onClick={() => setShowSearch(true)}
          className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
          size={24}
        />

        <div className="group relative">
          {isLoggedIn ? (
            <>
              <User
                className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
                size={24}
              />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
                <div className="flex flex-col gap-2 w-48 py-3 px-2 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded transition"
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded transition"
                  >
                    <Package size={18} />
                    <span>Orders</span>
                  </Link>
                  <hr className="my-1" />
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded transition"
                  >
                    <ShieldCheck size={18} />
                    <span>Admin Panel</span>
                  </Link>
                  <Link
                    to="/seller/dashboard"
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-green-50 hover:text-green-600 rounded transition"
                  >
                    <Store size={18} />
                    <span>Seller Dashboard</span>
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      navigate("/");
                    }}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-50 hover:text-red-600 rounded transition text-left w-full"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">
              <Smile
                className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
                size={24}
              />
            </Link>
          )}
        </div>
        <Link to="/cart" className="relative">
          <ShoppingCart className="text-gray-500" size={24} />
          {cartCount > 0 && (
            <p className=" absolute right-[-5px] bottom-[-4px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {cartCount}
            </p>
          )}
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

            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 "
              to="/collections"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 "
              to="/contact"
            >
              CONTACT
            </NavLink>

            <hr className="my-2" />

            {isLoggedIn ? (
              <>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-6"
                  to="/orders"
                >
                  MY ORDERS
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-6"
                  to="/admin/dashboard"
                >
                  ADMIN PANEL
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-6"
                  to="/seller/dashboard"
                >
                  SELLER DASHBOARD
                </NavLink>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setVisible(false);
                    navigate("/");
                  }}
                  className="py-2 pl-6 text-left text-red-600 hover:text-red-700"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6"
                to="/login"
              >
                LOGIN / SIGN UP
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
