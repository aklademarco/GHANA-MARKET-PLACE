import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useStore } from "../context/store";

const Orders = () => {
  const currency = useStore((s) => s.Currency);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Get auth token

        const response = await fetch("http://localhost:5000/api/v1/order", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const result = await response.json();

        if (result.success) {
          setOrders(result.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl mb-3">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <p className="text-center text-gray-500 mt-10">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl mb-3">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-3">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        Order #{order.id}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Items: {order.items?.length || 0}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="text-xl font-semibold">
                        {currency}
                        {parseFloat(order.totalAmount).toFixed(2)}
                      </p>
                    </div>
                    <button className="bg-black text-white px-6 py-2 text-sm rounded hover:bg-gray-800 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
