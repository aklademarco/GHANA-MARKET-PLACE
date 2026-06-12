import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Collections from "./pages/Collections";
import SearchBar from "./components/SearchBar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProfile from "./pages/seller/SellerProfile";
import AddProduct from "./pages/seller/AddProduct";
import SellerShop from "./pages/SellerShop";
import DashboardLayout from "./components/DashboardLayout";
import BookVerification from "./pages/BookVerification";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/seller");

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      {!isDashboardRoute && <Navbar />}
      {!isDashboardRoute && <SearchBar />}
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-shop-verification" element={<BookVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout role="admin"><AdminDashboard /></DashboardLayout>} />
        <Route path="/admin/dashboard" element={<DashboardLayout role="admin"><AdminDashboard /></DashboardLayout>} />

        {/* Seller Routes */}
        <Route path="/seller" element={<DashboardLayout role="seller"><SellerDashboard /></DashboardLayout>} />
        <Route path="/seller/dashboard" element={<DashboardLayout role="seller"><SellerDashboard /></DashboardLayout>} />
        <Route path="/seller/profile" element={<DashboardLayout role="seller"><SellerProfile /></DashboardLayout>} />
        <Route path="/seller/products/new" element={<DashboardLayout role="seller"><AddProduct /></DashboardLayout>} />
        <Route path="/shop/:sellerId" element={<SellerShop />} />
      </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

export default App;
