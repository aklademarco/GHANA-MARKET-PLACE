import React from "react";
import { useParams } from "react-router";
import { useStore } from "../context/store";
import { useCartStore } from "../context/cartStore";
import { Link } from "react-router-dom";

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
  const [selectedSize, setSelectedSize] = React.useState("");

  const products = useStore((s) => s.products);
  const Currency = useStore((s) => s.Currency);
  const addToCart = useCartStore((s) => s.addToCart);

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
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to={"/"} className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link to={"/collection"} className="hover:text-gray-900">
            Collection
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {images.length > 0 ? (
              <>
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-50">
                  <img
                    src={images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.slice(1, 5).map((src, i) => (
                      <div
                        key={i}
                        className="aspect-square overflow-hidden rounded-lg bg-gray-50 border-2 border-transparent hover:border-gray-300 cursor-pointer transition"
                      >
                        <img
                          src={src}
                          alt={`${product.name} ${i + 2}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square w-full bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400 text-lg">
                  No image available
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating || 0} />
                <span className="text-sm text-gray-500">
                  {product.rating
                    ? `${product.rating.toFixed(1)} out of 5`
                    : "No reviews yet"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold text-gray-900">
                  {Currency}
                  {product.price}
                </span>
                {product.inStock ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.size && product.size.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  Select Size:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                        selectedSize === s
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <button
                onClick={() => {
                  console.log("Add to cart clicked", {
                    productId: product.id,
                    selectedSize,
                  });
                  addToCart(product.id, selectedSize);
                }}
                disabled={!product.inStock}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 px-8 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>100% Original Product</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>Cash on delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  <span>Easy return & exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">
                Related Products
              </h2>
              <p className="text-gray-500 mt-2">
                Discover similar items you might like
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {related.map((p) => {
                const thumb = Array.isArray(p.image)
                  ? p.image[0]
                  : p.image || p.thumbnail || "";
                return (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group block"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-3">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition">
                      {p.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900">
                      {Currency}
                      {p.price}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Product;
