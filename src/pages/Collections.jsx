import React, { useContext, useState } from "react";
import { shopContext } from "../context/shopContext";
import { Menu, X, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Collections = () => {
  const { products } = useContext(shopContext);
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
      {/* filter options */}

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
    </div>
  );
};

export default Collections;
