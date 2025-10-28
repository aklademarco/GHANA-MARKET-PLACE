import { createContext } from "react";
import {products} from "../assets/assets"
import { useState } from "react";

export const shopContext = createContext(); 

export const ShopContextProvider = (props)=>{
    const currency = "GH₵";
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);


    



    const value = {
        products, currency, delivery_fee, search, setSearch,showSearch,setShowSearch
    }

    return (
             <shopContext.Provider value={value}>
                {props.children}
             </shopContext.Provider>
    )
}

export default ShopContextProvider