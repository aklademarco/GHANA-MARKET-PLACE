import { createContext } from "react";
import {products} from "../assets/assets"

export const shopContext = createContext(); //

export const ShopContextProvider = (props)=>{
    const currency = "GH₵";
    const delivery_fee = 10;
    const value = {
        products, currency, delivery_fee
    }

    return (
             <shopContext.Provider value={value}>
                {props.children}
             </shopContext.Provider>
    )
}

export default ShopContextProvider