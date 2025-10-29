import React, { useEffect, useState } from "react";
import { useStore } from "../context/store";
import { Search, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const showSearch = useStore((s) => s.showSearch);
  const setShowSearch = useStore((s) => s.setShowSearch);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection") && showSearch);
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="w-full justify-center inline-flex items-center gap-2">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
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
};

export default SearchBar;
