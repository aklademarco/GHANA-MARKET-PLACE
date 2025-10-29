import React, { useEffect, useState } from "react";
import { useStore } from "../context/store";
import Title from "./Title";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const products = useStore((s) => s.products);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSeller(bestProduct.slice(0, 6));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text:sm md:text-base text-gray-600">
          ou can't go wrong with these. Explore the most-loved, top-rated
          treasures from our artisan community. These are the pieces our
          customers keep coming back for.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItems
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
