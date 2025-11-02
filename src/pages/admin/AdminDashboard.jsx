import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Store,
} from "lucide-react";
import { useStore } from "../../context/store";
import { useCartStore } from "../../context/cartStore";

const AdminDashboard = () => {
  const products = useStore((s) => s.products);
  const currency = useStore((s) => s.Currency);

  // Mock data - In production, this would come from your backend
  const [stats] = useState({
    totalSales: 45890,
    totalOrders: 245,
    totalProducts: products.length,
    totalCustomers: 1234,
    totalSellers: 45,
    pendingOrders: 12,
    lowStockProducts: 5,
  });

  const [recentOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      amount: 450,
      status: "Processing",
      date: "2025-11-01",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      amount: 320,
      status: "Shipped",
      date: "2025-11-01",
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      amount: 180,
      status: "Delivered",
      date: "2025-10-31",
    },
    {
      id: "ORD004",
      customer: "Sarah Williams",
      amount: 520,
      status: "Processing",
      date: "2025-10-31",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your marketplace today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">
                +12.5%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-900">
              {currency}
              {stats.totalSales.toLocaleString()}
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
              <span className="text-blue-600 text-sm font-semibold">
                +8.2%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalOrders}
            </p>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="text-purple-600" size={24} />
              </div>
              <span className="text-purple-600 text-sm font-semibold">
                +5.1%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Products</h3>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalProducts}
            </p>
          </div>

          {/* Total Customers */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="text-orange-600" size={24} />
              </div>
              <span className="text-orange-600 text-sm font-semibold">
                +15.3%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Customers</h3>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalCustomers}
            </p>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/admin/products"
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-black transition"
              >
                <Package className="mb-2" size={32} />
                <span className="text-sm font-medium text-center">
                  Manage Products
                </span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-black transition"
              >
                <ShoppingBag className="mb-2" size={32} />
                <span className="text-sm font-medium text-center">
                  View Orders
                </span>
              </Link>
              <Link
                to="/admin/sellers"
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-black transition"
              >
                <Store className="mb-2" size={32} />
                <span className="text-sm font-medium text-center">
                  Manage Sellers
                </span>
              </Link>
              <Link
                to="/admin/customers"
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-black transition"
              >
                <Users className="mb-2" size={32} />
                <span className="text-sm font-medium text-center">
                  View Customers
                </span>
              </Link>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Alerts</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-yellow-900">
                    {stats.pendingOrders} Pending Orders
                  </p>
                  <p className="text-xs text-yellow-700">
                    Need immediate attention
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-red-900">
                    {stats.lowStockProducts} Low Stock Items
                  </p>
                  <p className="text-xs text-red-700">Restock needed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Store className="text-blue-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    {stats.totalSellers} Active Sellers
                  </p>
                  <p className="text-xs text-blue-700">Marketplace growing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-sm text-black hover:text-gray-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">
                      {currency}
                      {order.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
