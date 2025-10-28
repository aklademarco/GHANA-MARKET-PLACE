import React, { useEffect, useState } from 'react'
import {useContext} from 'react'
import { shopContext } from '../context/shopContext'
import { Search, X } from 'lucide-react'
import { useLocation } from 'react-router'

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(shopContext)
    const [visible, setVisible]= useState(false);
    const location = useLocation();
    useEffect(() =>{
        if (location.pathname.includes('collection') && showSearch){
            setVisible(true)
        }
        else {
            setVisible(false)
        }
    }, [location])
  return showSearch && visible? (
    <div className=" w-full justify-center inline-flex  items-center gap-2">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4  sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <Search />
      </div>
      <X onClick={() => setShowSearch(false)} className="cursor-pointer" />
    </div>
  ) : null;
}

export default SearchBar
