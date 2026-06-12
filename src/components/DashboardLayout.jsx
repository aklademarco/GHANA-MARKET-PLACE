import { createElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  ChevronLeft,
  CircleDollarSign,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  Settings,
  ShoppingBag,
  Store,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { assets } from "../assets/assets";

const adminNavigation = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Seller verification", to: "/admin/dashboard#verification", icon: ClipboardCheck },
  { label: "Stores", to: "/admin/dashboard#stores", icon: Store },
  { label: "Products", to: "/admin/dashboard#products", icon: Package },
  { label: "Orders", to: "/admin/dashboard#orders", icon: ShoppingBag },
  { label: "Customers", to: "/admin/dashboard#customers", icon: Users },
  { label: "Revenue", to: "/admin/dashboard#revenue", icon: CircleDollarSign },
  { label: "Analytics", to: "/admin/dashboard#analytics", icon: BarChart3 },
];

const sellerNavigation = [
  { label: "Overview", to: "/seller/dashboard", icon: LayoutDashboard },
  { label: "My products", to: "/seller/dashboard#products", icon: Package },
  { label: "Add product", to: "/seller/products/new", icon: PlusCircle },
  { label: "Orders", to: "/seller/dashboard#orders", icon: ShoppingBag },
  { label: "Payouts", to: "/seller/dashboard#payouts", icon: WalletCards },
  { label: "Analytics", to: "/seller/dashboard#analytics", icon: BarChart3 },
  { label: "Store settings", to: "/seller/profile", icon: Settings },
];

const DashboardLayout = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdmin = role === "admin";
  const navigation = isAdmin ? adminNavigation : sellerNavigation;
  const title = isAdmin ? "GMP Administration" : "Seller Centre";
  const accountName = isAdmin ? "GMP Admin" : "Ama Heritage";

  const closeSidebar = () => setSidebarOpen(false);
  const isNavigationActive = (label, to) => {
    if (label === "Overview") {
      return !location.hash && (
        location.pathname === `/${role}` ||
        location.pathname === `/${role}/dashboard`
      );
    }

    const [path, hash = ""] = to.split("#");
    return location.pathname === path && location.hash === (hash ? `#${hash}` : "");
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-800">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-[#071a33]/60 lg:hidden"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#071a33] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link to="/" className="flex items-center gap-3" onClick={closeSidebar}>
            <span className="rounded-lg bg-white px-2 py-1.5">
              <img src={assets.logo} alt="Ghana Market Place" className="h-7 w-auto" />
            </span>
          </Link>
          <button onClick={closeSidebar} className="text-white/70 lg:hidden" aria-label="Close sidebar">
            <X size={22} />
          </button>
        </div>

        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4b400]">{isAdmin ? "Admin workspace" : "Verified seller"}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0d8f62] font-extrabold">
              {isAdmin ? "GA" : "AH"}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{accountName}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/50">
                <BadgeCheck size={13} className="text-[#f4b400]" /> {isAdmin ? "Platform operations" : "Store verified"}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Workspace</p>
          <div className="space-y-1">
            {navigation.map(({ label, to, icon }) => {
              const isActive = isNavigationActive(label, to);
              return (
              <Link
                key={label}
                to={to}
                onClick={closeSidebar}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#0d8f62] text-white shadow-lg shadow-emerald-950/20"
                      : "text-white/65 hover:bg-white/8 hover:text-white"
                  }`}
              >
                {createElement(icon, { size: 19 })}
                {label}
              </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/8 hover:text-white">
            <ChevronLeft size={19} /> View marketplace
          </Link>
          <Link to="/login" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10">
            <LogOut size={19} /> Sign out
          </Link>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden" aria-label="Open sidebar">
              <Menu size={21} />
            </button>
            <div>
              <p className="text-xs font-semibold text-slate-400">Ghana Market Place</p>
              <h1 className="text-base font-extrabold text-[#0b2442] sm:text-lg">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600" aria-label="Notifications">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0d8f62] text-xs font-extrabold text-white">{isAdmin ? "GA" : "AH"}</span>
              <div><p className="text-sm font-bold text-[#0b2442]">{accountName}</p><p className="text-[11px] text-slate-400">{isAdmin ? "Administrator" : "Store owner"}</p></div>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
