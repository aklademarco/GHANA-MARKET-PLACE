import React from "react";
import { useStore } from "../context/store";
import { Link } from "react-router-dom";

const ProductItems = ({ id, name, price, image }) => {
  const currency = useStore((s) => s.Currency);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt=""
          className=" w-full h-[300px] object-cover rounded-2xl border shadow-md hover:scale-110 transition ease-in-out "
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItems;
