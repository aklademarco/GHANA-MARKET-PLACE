import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import { Menu, X, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems"

const Collections = () => {
  const { products } = useContext(shopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    setFilterProducts(products);
  }, []);
  const [visible, setVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (accordionName) => {
    if (openAccordion === accordionName) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(accordionName);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 pt-10">
      {/* left side. filter options */}

      <div>
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setVisible(true)}
        >
          <Filter />
          <p>Filter</p>
        </button>
        <div
          className={`fixed top-0 left-0 h-screen bg-white transition-transform duration-300 ${
            visible ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto z-50 w-full max-w-sm`}
        >
          <div className="flex flex-col text-gray-600 h-full">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <X />
              <p>Back</p>
            </div>

            <div className="w-full">
              {/* --- Price Accordion --- */}
              <div>
                <button
                  onClick={() => toggleAccordion("price")}
                  className="flex items-center justify-between w-full py-3 px-6 border-b"
                >
                  <span>Price</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "price" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "price" && (
                  <div className="pl-10 bg-gray-50">
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?price=0-100"
                    >
                      GHC 0 - 100
                    </Link>
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?price=100-250"
                    >
                      GHC 100 - 250
                    </Link>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("category")}
                  className="flex items-center justify-between w-full py-3 px-6 border-b"
                >
                  <span>Category</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "category" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "category" && (
                  <div className="pl-10 bg-gray-50">
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?category=jewelry"
                    >
                      Jewelry
                    </Link>
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?category=fashion"
                    >
                      Fashion
                    </Link>
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?category=fashion"
                    >
                      Craft Supplies
                    </Link>
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?category=fashion"
                    >
                      Baskets & Bags
                    </Link>
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?category=fashion"
                    >
                      Home Deco
                    </Link>
                  </div>
                )}
              </div>

              {/* --- Availability Accordion --- */}
              <div>
                <button
                  onClick={() => toggleAccordion("availability")}
                  className="flex items-center justify-between w-full py-3 px-6 border-b"
                >
                  <span>Availability</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "availability" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "availability" && (
                  <div className="pl-10 bg-gray-50">
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?availability=in-stock"
                    >
                      In Stock
                    </Link>
                    <Link
                      onClick={() => setVisible(false)}
                      className="block py-2"
                      to="/collection?availability=out-of-stock"
                    >
                      Out of Stock
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right side . sort options */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />
          <div>
            <p>Sort by: </p>
            <select className="border-2 border-gray-300 text-sm px-2">
              <option value="newest-arrivals">Newest Arrivals</option>
              <option value="top-rated">Top Rated</option>
              <option value="best-selling">Best Selling</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index)=>(
              <ProductItems key={index} name={item.name} id={item.id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Collections;
