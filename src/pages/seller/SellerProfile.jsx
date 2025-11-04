import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  MapPin,
  Mail,
  Phone,
  User,
  FileText,
  CreditCard,
  Smartphone,
  Camera,
  ArrowLeft,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";

const SellerProfile = () => {
  const [profileData, setProfileData] = useState({
    // Personal Information
    fullName: "Kofi Mensah",
    email: "kofi.mensah@gmail.com",
    phone: "+233 24 123 4567",

    // Store Information
    storeName: "Kofi's Authentic Kente",
    storeLocation: "Accra, Ghana",
    storeDescription:
      "Specializing in authentic handwoven Kente cloth and traditional Ghanaian crafts. Over 10 years of experience in the textile industry.",

    // Payment Information
    paymentMethod: "momo",
    momoNumber: "+233 24 123 4567",
    momoProvider: "MTN",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!profileData.fullName || !profileData.email || !profileData.storeName) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Save profile data
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/seller/dashboard"
              className="p-2 hover:bg-gray-200 rounded-lg transition"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Profile Settings
              </h1>
              <p className="text-gray-600">
                Manage your account and store details
              </p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={48} className="text-gray-400" />
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
                  >
                    <Camera size={20} />
                  </button>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {profileData.fullName}
                </h3>
                <p className="text-gray-600 text-sm">{profileData.email}</p>
                {isEditing && (
                  <p className="text-xs text-gray-500 mt-2">
                    Click the camera icon to upload a new profile picture
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Store Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="storeName"
                    value={profileData.storeName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="storeLocation"
                    value={profileData.storeLocation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="storeDescription"
                    value={profileData.storeDescription}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    profileData.paymentMethod === "momo"
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-gray-400"
                  } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={profileData.paymentMethod === "momo"}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="sr-only"
                  />
                  <Smartphone
                    className={`h-8 w-8 mb-2 ${
                      profileData.paymentMethod === "momo"
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">Mobile Money</span>
                </label>

                <label
                  className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    profileData.paymentMethod === "bank"
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-gray-400"
                  } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={profileData.paymentMethod === "bank"}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="sr-only"
                  />
                  <CreditCard
                    className={`h-8 w-8 mb-2 ${
                      profileData.paymentMethod === "bank"
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">Bank Transfer</span>
                </label>
              </div>
            </div>

            {/* Mobile Money Details */}
            {profileData.paymentMethod === "momo" && (
              <div className="space-y-4 border-t pt-6">
                <h3 className="font-semibold">Mobile Money Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider
                    </label>
                    <select
                      name="momoProvider"
                      value={profileData.momoProvider}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    >
                      <option value="MTN">MTN Mobile Money</option>
                      <option value="Vodafone">Vodafone Cash</option>
                      <option value="AirtelTigo">AirtelTigo Money</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MoMo Number
                    </label>
                    <input
                      type="tel"
                      name="momoNumber"
                      value={profileData.momoNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details */}
            {profileData.paymentMethod === "bank" && (
              <div className="space-y-4 border-t pt-6">
                <h3 className="font-semibold">Bank Account Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={profileData.bankName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="e.g., GCB Bank"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={profileData.accountNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter account number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Name
                    </label>
                    <input
                      type="text"
                      name="accountName"
                      value={profileData.accountName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Name on account"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
