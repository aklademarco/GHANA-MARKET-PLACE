import { Facebook, Instagram, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => (
  <footer className="bg-[#071a33] text-white">
    <div className="gmp-container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div>
        <img src={assets.logo} alt="Ghana Market Place" className="h-12 rounded bg-white px-2 py-1" />
        <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100/70">
          Ghana's trusted multi-vendor marketplace, connecting buyers with verified local businesses across the country.
        </p>
        <p className="mt-5 flex items-center gap-2 text-sm font-bold text-[#f4b400]"><ShieldCheck size={18} /> Shop verified. Shop Ghana.</p>
      </div>
      <div>
        <h3 className="mb-5 text-sm font-extrabold">Marketplace</h3>
        <div className="flex flex-col gap-3 text-sm text-blue-100/65">
          <Link to="/collections">All products</Link><Link to="/collections">Featured deals</Link><a href="/#verified-stores">Verified stores</a><Link to="/orders">Track an order</Link>
        </div>
      </div>
      <div>
        <h3 className="mb-5 text-sm font-extrabold">Sell on GMP</h3>
        <div className="flex flex-col gap-3 text-sm text-blue-100/65">
          <Link to="/book-shop-verification">Book shop verification</Link><Link to="/seller/dashboard">Seller centre</Link><Link to="/about">How verification works</Link><Link to="/contact">Seller support</Link>
        </div>
      </div>
      <div>
        <h3 className="mb-5 text-sm font-extrabold">Contact</h3>
        <div className="flex flex-col gap-3 text-sm text-blue-100/65">
          <span className="flex items-center gap-2"><MapPin size={16} /> Accra, Ghana</span><span className="flex items-center gap-2"><Phone size={16} /> +233 20 000 0000</span><span className="flex items-center gap-2"><Mail size={16} /> hello@gmp.com</span>
        </div>
        <div className="mt-5 flex gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Facebook size={17} /></span><span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Instagram size={17} /></span></div>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="gmp-container flex flex-col justify-between gap-2 py-5 text-xs text-blue-100/50 sm:flex-row">
        <p>© 2026 Ghana Market Place. All rights reserved.</p><p>Privacy · Terms · Buyer protection</p>
      </div>
    </div>
  </footer>
);

export default Footer;
