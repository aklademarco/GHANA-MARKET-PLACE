import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Plus, Save, Package } from "lucide-react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([""]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    inStock: true,
  });

  const categories = [
    "Fashion",
    "Jewelry",
    "Home Deco",
    "Baskets & Bags",
    "Craft Supplies",
  ];

  const subCategories = {
    Fashion: ["Men's Clothing", "Women's Clothing", "Footwear", "Accessories"],
    Jewelry: ["Necklaces", "Bracelets", "Earrings", "Rings"],
    "Home Deco": ["Wall Art", "Sculptures", "Decorative Items"],
    "Baskets & Bags": ["Market Baskets", "Handbags", "Storage Baskets"],
    "Craft Supplies": ["Fabrics", "Beads", "Tools"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      toast.error("You can only upload up to 5 images");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const addSize = () => {
    setSizes([...sizes, ""]);
  };

  const updateSize = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const removeSize = (index) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!productData.name || !productData.description || !productData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!productData.category || !productData.subCategory) {
      toast.error("Please select category and subcategory");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    const validSizes = sizes.filter((size) => size.trim() !== "");
    if (validSizes.length === 0) {
      toast.error("Please add at least one size");
      return;
    }

    // Create product object
    const newProduct = {
      ...productData,
      sizes: validSizes,
      images: images.map((img) => img.preview),
      dateAdded: new Date().toISOString(),
    };

    console.log("New Product:", newProduct);
    toast.success("Product added successfully!");

    // Navigate back to dashboard
    setTimeout(() => {
      navigate("/seller/dashboard");
    }, 1500);
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
                Add New Product
              </h1>
              <p className="text-gray-600">
                Fill in the details to list your product
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload size={24} />
              Product Images
              <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Upload up to 5 images. First image will be the cover photo.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Image Previews */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square border-2 border-gray-300 rounded-lg overflow-hidden group"
                >
                  <img
                    src={image.preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={16} />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                      Cover
                    </div>
                  )}
                </div>
              ))}

              {/* Upload Button */}
              {images.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-sm text-gray-600">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package size={24} />
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  placeholder="e.g., Handwoven Kente Cloth"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  placeholder="Describe your product in detail..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include materials, dimensions, and unique features
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (GH₵) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </div>
          </div>

          {/* Category & Classification */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Category & Classification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="subCategory"
                  value={productData.subCategory}
                  onChange={handleChange}
                  disabled={!productData.category}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  required
                >
                  <option value="">Select Sub Category</option>
                  {productData.category &&
                    subCategories[productData.category]?.map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sizes/Variants */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Available Sizes/Variants <span className="text-red-500">*</span>
              </h2>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus size={16} />
                Add Size
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Add sizes, colors, or variants for your product
            </p>

            <div className="space-y-3">
              {sizes.map((size, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => updateSize(index, e.target.value)}
                    placeholder="e.g., Small, Medium, Large, or One Size"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Stock Status</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={productData.inStock}
                onChange={handleChange}
                className="w-5 h-5 text-black focus:ring-black border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Product is in stock
                </span>
                <p className="text-xs text-gray-500">
                  Uncheck if product is currently unavailable
                </p>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Link
              to="/seller/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Save size={20} />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
