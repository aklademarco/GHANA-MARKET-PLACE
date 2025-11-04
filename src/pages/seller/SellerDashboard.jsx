import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  Wallet,
  ArrowUpRight,
  Settings,
} from "lucide-react";
import { useStore } from "../../context/store";
import { toast } from "react-toastify";

const SellerDashboard = () => {
  const products = useStore((s) => s.products);
  const currency = useStore((s) => s.Currency);

  // Mock seller data - In production, filter by seller ID
  const [sellerStats] = useState({
    totalSales: 12450,
    availableBalance: 8200,
    pendingBalance: 3150,
    totalWithdrawn: 1100,
    totalOrders: 87,
    totalProducts: 8,
    pendingOrders: 5,
  });

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Filter products for this seller (mock - would use seller ID)
  const sellerProducts = products.slice(0, 5);

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amount > sellerStats.availableBalance) {
      toast.error("Insufficient balance");
      return;
    }
    // Process withdrawal
    toast.success(`Withdrawal request of ${currency}${amount} submitted successfully!`);
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Seller Dashboard
            </h1>
            <p className="text-gray-600">Manage your shop and products</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/seller/profile"
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Settings size={20} />
              Profile Settings
            </Link>
            <Link
              to="/seller/products/new"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Financial Overview Card */}
        <div className="bg-gray-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Wallet size={28} />
              </div>
              <div>
                <h2 className="text-lg font-semibold opacity-90">Total Earnings</h2>
                <p className="text-3xl font-bold">
                  {currency}
                  {sellerStats.totalSales.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="bg-white text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 font-semibold"
            >
              <ArrowUpRight size={20} />
              Withdraw
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/20 pt-4">
            <div>
              <p className="text-sm opacity-80 mb-1">Available Balance</p>
              <p className="text-xl font-bold">
                {currency}
                {sellerStats.availableBalance.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-1">Pending Balance</p>
              <p className="text-xl font-bold">
                {currency}
                {sellerStats.pendingBalance.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-1">Total Withdrawn</p>
              <p className="text-xl font-bold">
                {currency}
                {sellerStats.totalWithdrawn.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
              <span className="text-blue-600 text-sm font-semibold">+8.2%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">
              {sellerStats.totalOrders}
            </p>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">My Products</h3>
            <p className="text-2xl font-bold text-gray-900">
              {sellerStats.totalProducts}
            </p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <TrendingUp className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Pending Orders</h3>
            <p className="text-2xl font-bold text-gray-900">
              {sellerStats.pendingOrders}
            </p>
          </div>
        </div>

        {/* Products Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">My Products</h2>
            <Link
              to="/seller/products"
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
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">
                      {currency}
                      {product.price}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.inStock
                            ? "bg-green-100 text-gray-600"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded transition">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition">
                          <Edit size={18} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition">
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link
              to="/seller/orders"
              className="text-sm text-black hover:text-gray-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="text-center py-12 text-gray-500">
            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No recent orders to display</p>
            <p className="text-sm mt-2">Orders will appear here once placed</p>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Withdraw Funds</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Available Balance</p>
              <p className="text-2xl font-bold text-gray-600">
                {currency}
                {sellerStats.availableBalance.toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">
                  {currency}
                </span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Withdrawal requests are processed within 1-3 business days. 
                Funds will be transferred to your registered payment method.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setWithdrawAmount("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
