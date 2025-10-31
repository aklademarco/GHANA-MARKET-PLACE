import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../context/cartStore";
import { useStore } from "../context/store";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const products = useStore((s) => s.products);
  const currency = useStore((s) => s.Currency);
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getCartAmount,
  } = useCartStore();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          tempData.push({
            id: productId,
            size,
            quantity,
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  // ➕ Increase quantity
  const handleIncrease = (productId, size) => {
    addToCart(productId, size);
  };

  const handleDecrease = (productId, size) => {
    decreaseQuantity(productId, size);
  };

  const handleRemove = (productId, size) => {
    removeFromCart(productId, size);
  };

  // 💰 Get totals directly from Zustand
  const subtotal = getCartAmount();
  const shipping = cartData.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((p) => p.id === item.id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_1fr_0.5fr] items-center gap-4"
              >
                {/* 🛍️ Product Info */}
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div className="text-xs sm:text-lg font-medium">
                    <p>{productData.name}</p>
                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                    <p className="text-gray-900">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={item.quantity === 1}
                    onClick={() => handleDecrease(item.id, item.size)}
                    className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <div className="px-4 py-1 text-lg border-t border-b border-gray-300">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => handleIncrease(item.id, item.size)}
                    className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm sm:text-lg font-semibold">
                  {currency}
                  {productData.price * item.quantity}
                </p>

                <Trash2
                  className="w-5 h-5 cursor-pointer hover:text-red-500 transition"
                  onClick={() => handleRemove(item.id, item.size)}
                />
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px] border-t pt-6">
            <div className="flex justify-between mb-3 text-sm">
              <p>Subtotal</p>
              <p>
                {currency}
                {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between mb-3 text-sm">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {shipping.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <p>Total</p>
              <p>
                {currency}
                {total.toFixed(2)}
              </p>
            </div>

            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
