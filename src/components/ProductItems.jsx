import React, { useContext } from 'react'
import { shopContext } from '../context/shopContext'
import {Link} from 'react-router'

const ProductItems = ({id, name, price, image}) => {
    const {currency} = useContext(shopContext)
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
}

export default ProductItems
