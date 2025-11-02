import React from "react";
import Title from "../components/Title";
import { useStore } from "../context/store";

const Orders = () => {
  const currency = useStore((s) => s.Currency);

  // Mock orders data - In a real app, this would come from your backend
  const orders = [
    {
      id: "ORD001",
      date: "2025-10-28",
      status: "Delivered",
      total: 450,
      items: 3,
    },
    {
      id: "ORD002",
      date: "2025-10-25",
      status: "In Transit",
      total: 320,
      items: 2,
    },
    {
      id: "ORD003",
      date: "2025-10-20",
      status: "Processing",
      total: 180,
      items: 1,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Items: {order.items}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="text-xl font-semibold">
                        {currency}
                        {order.total.toFixed(2)}
                      </p>
                    </div>
                    <button className="bg-black text-white px-6 py-2 text-sm rounded hover:bg-gray-800 transition">
                      Track Order
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
