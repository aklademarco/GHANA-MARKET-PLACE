import React, { useState } from "react";
import { useStore } from "../context/store";
import { useCartStore } from "../context/cartStore";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const currency = useStore((s) => s.Currency);
  const deliveryFee = useStore((s) => s.delivery_fee);
  const { cartItems, getCartAmount, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = getCartAmount();
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.street ||
      !formData.city
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Simulate order placement
    toast.success("Order placed successfully!");
    clearCart();
    setTimeout(() => {
      navigate("/orders");
    }, 1500);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3"
            required
          />
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3"
            required
          />
          <div className="flex gap-3 mt-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <div className="flex gap-3 mt-3">
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              placeholder="Zipcode"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3"
            required
          />
        </form>
      </div>

      {/* Right Side - Cart Totals & Payment */}
      <div className="mt-8 w-full sm:max-w-[450px]">
        <div className="mt-8 min-w-80">
          <Title text1={"CART"} text2={"TOTALS"} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency}
              {subtotal.toFixed(2)}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>
              {currency}
              {deliveryFee.toFixed(2)}
            </p>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>
              {currency}
              {total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row mt-5">
            <div
              onClick={() => setPaymentMethod("momo")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                paymentMethod === "momo" ? "border-green-400 bg-green-50" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "momo" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">MOMO</p>
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                paymentMethod === "cod" ? "border-green-400 bg-green-50" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
