import React from "react";
import { useParams } from "react-router";
import { useStore } from "../context/store";

const StarRating = ({ rating = 0, max = 5 }) => {
  const full = Math.round(Math.max(0, Math.min(rating, max)));
  return (
    <div className="text-yellow-400 text-lg leading-none">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

const Product = () => {
  const { productId } = useParams();

  const products = useStore((s) => s.products);
  const addToCart = useStore((s) => s.addToCart);
  const Currency = useStore((s) => s.Currency);

  const product = React.useMemo(
    () => products.find((item) => item.id?.toString() === productId),
    [products, productId]
  );

  const related = React.useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category || "").toLowerCase() ===
            (product.category || "").toLowerCase()
      )
      .slice(0, 4);
  }, [products, product]);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  const images = Array.isArray(product.image)
    ? product.image
    : product.images && Array.isArray(product.images)
    ? product.images
    : product.image
    ? [product.image]
    : [];

  return (
    <div className="max-w-[1100px] mx-auto my-6 px-4 ">
      <div className="flex gap-6 items-start flex-wrap">
        <div className="flex-1 min-w-[280px] basis-[360px]">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 w-lg h-lg">
              <img
                src={images[0]}
                alt={product.name}
                loading="lazy"
                className="w-full h-auto rounded-lg object-cover shadow-md"
              />
              {images.length > 1 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {images.slice(1, 5).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${product.name} ${i + 2}`}
                      loading="lazy"
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-320 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[260px] basis-[380px]">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-3">
            <StarRating rating={product.rating || 0} />
            <span className="text-gray-600">
              {product.rating
                ? `${product.rating.toFixed(1)} / 5`
                : "No rating"}
            </span>
          </div>

          <p className="text-gray-800 leading-relaxed mb-3">
            {product.description}
          </p>

          <div className="flex items-baseline gap-4 mb-4">
            <div className="text-xl font-bold">
              {product.price} {Currency}
            </div>
            {product.inStock ? (
              <div className="text-green-600">In stock</div>
            ) : (
              <div className="text-red-600">Out of stock</div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => addToCart(product, 1)}
              disabled={!product.inStock}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to cart
            </button>

          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-medium">Related products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {related.map((p) => {
              const thumb = Array.isArray(p.image)
                ? p.image[0]
                : p.image || p.thumbnail || "";
              return (
                <a
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="block p-3 rounded-lg border border-gray-100 bg-white hover:shadow"
                >
                  <div className="w-full h-28 mb-2 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-gray-600 mt-1">
                    {p.price} {Currency}
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Product;
