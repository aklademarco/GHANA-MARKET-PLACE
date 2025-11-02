import React, { useEffect, useState } from "react";
import { useStore } from "../context/store";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const products = useStore((s) => s.products);
  console.log(products);
  const [LatestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 12));
  }, [products]);
  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className=" w-3/4 m-auto text-xs sm:text-small md:text-base text-gray-600">
          Curated for you. Discover unique, one-of-a-kind pieces, each with a
          story to tell. This is the latest in authentic Ghanaian craft.
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {LatestProducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            sellerId={item.sellerId}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
