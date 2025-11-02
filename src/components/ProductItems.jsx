import React from "react";
import { useStore } from "../context/store";
import { Link } from "react-router-dom";
import { Store } from "lucide-react";

const ProductItems = ({ id, name, price, image, sellerId }) => {
  const currency = useStore((s) => s.Currency);
  
  return (
    <div className="text-gray-700 cursor-pointer group">
      <Link to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-[300px] object-cover rounded-2xl border shadow-md hover:scale-110 transition ease-in-out"
          />
        </div>
      </Link>
      
      <div className="pt-3 pb-1">
        <Link to={`/product/${id}`}>
          <p className="text-sm hover:text-gray-900">{name}</p>
        </Link>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm font-medium">
            {currency}
            {price}
          </p>
          
          {sellerId && (
            <Link
              to={`/shop/${sellerId}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 hover:underline transition"
            >
              <Store size={14} />
              <span>View Store</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
