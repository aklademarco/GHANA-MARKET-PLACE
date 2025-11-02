import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Store, MapPin, Phone, Mail, Star } from "lucide-react";
import { useStore } from "../context/store";
import ProductItems from "../components/ProductItems";

const SellerShop = () => {
  const { sellerId } = useParams();
  const products = useStore((s) => s.products);

  // Mock seller data - In production, fetch from backend
  const [seller] = useState({
    id: sellerId,
    name: "Kwame's Authentic Crafts",
    description:
      "Master craftsman specializing in traditional Ghanaian wood carvings and sculptures. Family business passed down through 3 generations.",
    avatar: "https://via.placeholder.com/150",
    location: "Kumasi, Ashanti Region",
    phone: "+233 24 123 4567",
    email: "kwame@crafts.com",
    rating: 4.8,
    totalReviews: 156,
    totalSales: 1200,
    memberSince: "2022",
    verified: true,
  });

  // Filter products by seller (mock - would filter by seller ID)
  const sellerProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Shop Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Shop Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {seller.name}
                    </h1>
                    {seller.verified && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 max-w-2xl">
                    {seller.description}
                  </p>
                </div>
              </div>

              {/* Shop Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Star
                      className="text-yellow-500"
                      size={18}
                      fill="currentColor"
                    />
                    <span className="font-semibold text-lg">
                      {seller.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {seller.totalReviews} Reviews
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-lg mb-1">
                    {seller.totalSales}+
                  </p>
                  <p className="text-xs text-gray-600">Total Sales</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-lg mb-1">
                    {sellerProducts.length}
                  </p>
                  <p className="text-xs text-gray-600">Products</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-lg mb-1">
                    {seller.memberSince}
                  </p>
                  <p className="text-xs text-gray-600">Member Since</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{seller.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{seller.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{seller.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Shop Products
          </h2>
          <p className="text-gray-600">
            Browse authentic handcrafted items from {seller.name}
          </p>
        </div>

        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
            {sellerProducts.map((product) => (
              <ProductItems
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                sellerId={product.sellerId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Store size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">No products available at the moment</p>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Shop
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {seller.description}
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We take pride in our traditional craftsmanship and authentic
              Ghanaian artistry. Each piece is carefully handcrafted using
              techniques passed down through generations. We source our
              materials locally and work directly with skilled artisans to bring
              you the finest quality products.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Customer satisfaction is our top priority. We ensure that every
              item meets our high standards of quality before it reaches you.
              Thank you for supporting local Ghanaian craftsmanship!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerShop;
