import React, { useEffect, useState } from "react";
import { useStore } from "../context/store";
import { Menu, X, Filter, ChevronDown, FileHeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collections = () => {
  const products = useStore((s) => s.products);
  const search = useStore((s) => s.search);
  const [filterProducts, setFilterProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [sortBy, setSortBy] = useState("newest-arival");

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    // search filter

    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((item) => {
        const name = (item.name || "").toLowerCase();
        const category = (item.category || "").toLowerCase();
        const desc = (item.description || "").toLowerCase();
        return name.includes(q) || category.includes(q) || desc.includes(q);
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (item) => item.price >= min && item.price <= max
      );
    }
    if (selectedAvailability) {
      filtered = filtered.filter((item) => {
        if (selectedAvailability === "in-stock") return item.inStock === true;
        if (selectedAvailability === "out-of-stock")
          return item.inStock === false;
        return true;
      });
    }

    switch (sortBy) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        filtered.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      case "top-rated":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    setFilterProducts(filtered);
  }, [
    search,
    products,
    selectedCategory,
    selectedPriceRange,
    selectedAvailability,
    sortBy,
  ]);

  const toggleAccordion = (accordionName) => {
    setOpenAccordion(openAccordion === accordionName ? null : accordionName);
  };

  const handleFilterClick = (filterType, value) => {
    switch (filterType) {
      case "category":
        setSelectedCategory(selectedCategory === value ? "" : value);
        break;
      case "price":
        setSelectedPriceRange(selectedPriceRange === value ? "" : value);
        break;
      case "availability":
        setSelectedAvailability(selectedAvailability === value ? "" : value);
        break;
    }
    setVisible(false);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
    setSelectedAvailability("");
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
              <div>
                <button
                  onClick={() => clearFilters("")}
                  className="flex items-center justify-between w-full py-3 px-6 border-b"
                >
                  <span>All</span>
                </button>
              </div>

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
                    <button
                      onClick={() => handleFilterClick("price", "0-100")}
                      className={`block py-2 w-full text-left ${
                        selectedPriceRange === "0-100"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      GHC 0 - 100
                    </button>
                    <button
                      onClick={() => handleFilterClick("price", "100-250")}
                      className={`block py-2 w-full text-left ${
                        selectedPriceRange === "100-250"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      GHC 100 - 250
                    </button>
                    <button
                      onClick={() => handleFilterClick("price", "250-500")}
                      className={`block py-2 w-full text-left ${
                        selectedPriceRange === "250-500"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      GHC 250 - 500
                    </button>
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
                    <button
                      onClick={() => handleFilterClick("category", "jewelry")}
                      className={`block py-2 w-full text-left ${
                        selectedCategory === "jewelry"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      Jewelry
                    </button>
                    <button
                      onClick={() => handleFilterClick("category", "fashion")}
                      className={`block py-2 w-full text-left ${
                        selectedCategory === "fashion"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      Fashion
                    </button>
                    <button
                      onClick={() =>
                        handleFilterClick("category", "craft supplies")
                      }
                      className={`block py-2 w-full text-left ${
                        selectedCategory === "craft supplies"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      Craft Supplies
                    </button>
                    <button
                      onClick={() =>
                        handleFilterClick("category", "baskets & bags")
                      }
                      className={`block py-2 w-full text-left ${
                        selectedCategory === "baskets & bags"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      Baskets & Bags
                    </button>
                    <button
                      onClick={() => handleFilterClick("category", "home deco")}
                      className={`block py-2 w-full text-left ${
                        selectedCategory === "home deco"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      Home Deco
                    </button>
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
                    <button
                      onClick={() =>
                        handleFilterClick("availability", "in-stock")
                      }
                      className={`block py-2 w-full text-left ${
                        selectedAvailability === "in-stock"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      In Stock
                    </button>
                    <button
                      onClick={() =>
                        handleFilterClick("availability", "out-of-stock")
                      }
                      className={`block py-2 w-full text-left ${
                        selectedAvailability === "out-of-stock"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      Out of Stock
                    </button>
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
            <select
              className="border-2 border-gray-300 text-sm px-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
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
          {filterProducts.map((item, index) => (
            <ProductItems
              key={index}
              name={item.name}
              id={item.id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
