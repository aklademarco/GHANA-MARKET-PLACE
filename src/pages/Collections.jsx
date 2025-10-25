import React, { useContext, useState } from 'react'
import { shopContext } from '../context/shopContext';
import { Menu, X, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Collections = () => {
  const {products} = useContext(shopContext);
  const [visible, setVisible] = useState(false);
  return (
    <div className=" flex flex-col sm:flex-row gap-1 pt-10">
      {/* filter options */}

      <div>
        <div className="cursor-pointer" onClick={() => setVisible(true)}>
          <Filter />
          <p>Filter</p>
        </div>

        <div
          className={`fixed top-0 right-0  bg-white transition-transform duration-300   ${
            visible ? "w-full" : "w-0"
          }  overflow-y-auto z-50`}
        >
          <div className="flex flex-col text-gray-600 h-full">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <X className="rotate-180 " />
              <p>Back</p>
            </div>

            {/* Filter links  */}
            <div className='border w-32'>
              <Link
                onClick={() => setVisible(false)}
                className="block py-2 pl-6 "
                to="/"
              >
                <span>Price</span>
              </Link>

              <Link
                onClick={() => setVisible(false)}
                className="block py-2 pl-6 "
                to="/"
              >
                <span>Category</span>
              </Link>

              <Link
                onClick={() => setVisible(false)}
                className="block py-2 pl-6"
                to="/"
              >
                <span>Availability</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections
