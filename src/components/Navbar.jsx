import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Store,
  UserRound,
  LogOut,
  X,
} from "lucide-react";
import { assets } from "../assets/assets";
import { useCartStore } from "../context/cartStore";
import { useStore } from "../context/store";
import { useAuthStore } from "../context/authStore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const categoryMenuRef = useRef(null);
  const cartItems = useCartStore((state) => state.cartItems);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userRole = useAuthStore((state) => state.userRole);
  const logout = useAuthStore((state) => state.logout);
  const setSearch = useStore((state) => state.setSearch);
  const products = useStore((state) => state.products);
  const setCategory = useStore((state) => state.setCategory);
  const navigate = useNavigate();
  const categories = [...new Set(products.map((product) => product.category))].sort();
  const isSeller = isLoggedIn && userRole === "seller";

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setCategoryOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const cartCount = Object.values(cartItems).reduce(
    (total, sizes) =>
      total + Object.values(sizes).reduce((sum, quantity) => sum + quantity, 0),
    0
  );

  const runSearch = (event) => {
    event.preventDefault();
    setSearch(query.trim());
    setCategory("");
    navigate("/collections");
  };

  const browseCategory = (category = "") => {
    setSearch("");
    setCategory(category);
    setQuery("");
    setCategoryOpen(false);
    setMobileCategoryOpen(false);
    setMenuOpen(false);
    navigate("/collections");
  };

  const browseAllProducts = () => {
    setSearch("");
    setCategory("");
    setQuery("");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `transition hover:text-[#f4b400] ${isActive ? "text-[#f4b400]" : "text-white/80"}`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)]">
      <div className="bg-[#081d3a] text-white">
        <div className="gmp-container flex h-9 items-center justify-between text-[11px] sm:text-xs">
          <p>Buy with confidence from verified Ghanaian businesses.</p>
          <div className="hidden items-center gap-5 md:flex">
            {isSeller && <Link to="/seller/dashboard" className="hover:text-[#f4b400]">Seller Centre</Link>}
            <Link to="/orders" className="hover:text-[#f4b400]">Track Order</Link>
            <span>Help: +233 20 000 0000</span>
          </div>
        </div>
      </div>

      <div className="gmp-container flex items-center gap-4 py-4 lg:gap-8">
        <Link to="/" className="shrink-0">
          <img src={assets.logo} alt="Ghana Market Place" className="h-10 w-auto sm:h-12" />
        </Link>

        <form onSubmit={runSearch} className="hidden flex-1 md:flex">
          <label className="flex h-12 w-full items-center rounded-l-xl border-2 border-r-0 border-[#0d8f62] bg-[#f8fafc] px-4">
            <Search size={19} className="mr-3 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search products, stores or categories"
              aria-label="Search products"
            />
          </label>
          <button className="rounded-r-xl bg-[#0d8f62] px-7 text-sm font-bold text-white transition hover:bg-[#087653]">
            Search
          </button>
        </form>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          {isLoggedIn ? (
            <div className="group relative hidden sm:block">
              <button className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <UserRound size={22} />
                <span className="hidden max-w-28 truncate lg:block">{user?.name || "My account"}</span>
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-48 translate-y-2 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link to="/orders" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">My orders</Link>
                {isSeller && <Link to="/seller/dashboard" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Seller Centre</Link>}
                <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={16} /> Sign out</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden items-center gap-2 text-sm font-semibold text-slate-700 sm:flex">
              <UserRound size={22} />
              <span className="hidden lg:block">Sign in</span>
            </Link>
          )}
          <button className="hidden text-slate-700 sm:block" aria-label="Saved items"><Heart size={22} /></button>
          <Link to="/cart" className="relative flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ShoppingBag size={24} />
            <span className="hidden lg:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#e53935] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(true)} className="md:hidden" aria-label="Open menu"><Menu /></button>
        </div>
      </div>

      <nav className="bg-[#0d2f57]">
        <div className="gmp-container hidden h-11 items-center gap-8 text-sm font-semibold md:flex">
          <div ref={categoryMenuRef} className="relative h-full">
            <button
              type="button"
              onClick={() => setCategoryOpen((open) => !open)}
              aria-expanded={categoryOpen}
              aria-haspopup="menu"
              className="flex h-full items-center gap-2 bg-[#0d8f62] px-5 text-white transition hover:bg-[#087653]"
            >
              <Menu size={17} /> Shop by category
              <ChevronDown size={15} className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-full z-50 w-72 overflow-hidden rounded-b-2xl border border-slate-100 bg-white py-2 text-slate-700 shadow-2xl" role="menu">
                <button onClick={() => browseCategory()} className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-bold transition hover:bg-emerald-50 hover:text-[#0d8f62]" role="menuitem">
                  All categories <ChevronRight size={16} />
                </button>
                <div className="mx-5 border-t border-slate-100" />
                {categories.map((category) => (
                  <button key={category} onClick={() => browseCategory(category)} className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-semibold transition hover:bg-emerald-50 hover:text-[#0d8f62]" role="menuitem">
                    {category} <ChevronRight size={16} className="text-slate-300" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/collections" onClick={browseAllProducts} className={navClass}>All products</NavLink>
          <a href="/#verified-stores" className="text-white/80 transition hover:text-[#f4b400]">Verified stores</a>
          <a href="/#deals" className="text-white/80 transition hover:text-[#f4b400]">Deals</a>
          <NavLink to="/about" className={navClass}>About GMP</NavLink>
          <Link to="/book-shop-verification" className="ml-auto flex items-center gap-2 text-[#f4b400]"><Store size={17} /> Start selling</Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#081d3a]/60 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="ml-auto h-full w-[82%] max-w-sm bg-white p-6" onClick={(event) => event.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between">
              <img src={assets.logo} alt="GMP" className="h-10" />
              <button onClick={() => setMenuOpen(false)}><X /></button>
            </div>
            <form onSubmit={runSearch} className="mb-7 flex rounded-xl border border-slate-200 p-3">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search GMP" className="w-full outline-none" />
              <Search size={20} />
            </form>
            <div className="flex flex-col gap-5 font-semibold text-slate-800">
              <button onClick={() => setMobileCategoryOpen((open) => !open)} className="flex items-center justify-between text-left">
                Shop by category <ChevronDown size={17} className={`transition-transform ${mobileCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileCategoryOpen && (
                <div className="-mt-2 flex flex-col gap-3 border-l-2 border-[#0d8f62] pl-4 text-sm font-medium text-slate-600">
                  <button onClick={() => browseCategory()} className="text-left">All categories</button>
                  {categories.map((category) => <button key={category} onClick={() => browseCategory(category)} className="text-left">{category}</button>)}
                </div>
              )}
              {[['/', 'Home'], ['/collections', 'All products'], ['/orders', 'Track order'], ['/book-shop-verification', 'Book shop verification'], ...(isSeller ? [['/seller/dashboard', 'Seller centre']] : []), ['/about', 'About GMP'], ['/contact', 'Help & contact']].map(([to, label]) => (
                <Link key={to} to={to} onClick={label === "All products" ? browseAllProducts : () => setMenuOpen(false)}>{label}</Link>
              ))}
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center gap-2 text-left text-red-600"><LogOut size={17} /> Sign out</button>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>Sign in</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
