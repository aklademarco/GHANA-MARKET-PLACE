import { BadgeCheck, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/store";

const sellerNames = {
  "1": "Bolga Craft House",
  "2": "Ama Heritage",
  "3": "Asante Woodworks",
  "4": "Northern Loom",
  "5": "Accra Digital Hub",
  "6": "HomeTech Ghana",
  "7": "Prime Furniture GH",
};

const ProductItems = ({ id, name, price, image, sellerId, rating = 0, inStock = true }) => {
  const currency = useStore((state) => state.Currency);
  const thumbnail = Array.isArray(image) ? image[0] : image;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="product-media-frame">
        <Link to={`/product/${id}`} className="block h-full w-full"><img src={thumbnail} alt={name} className="product-media-image transition duration-500 group-hover:scale-[1.03]" /></Link>
        <button className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-600 shadow-sm transition hover:text-red-500" aria-label={`Save ${name}`}><Heart size={17} /></button>
        {!inStock && <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-bold text-white">Out of stock</span>}
      </div>
      <div className="p-4">
        <Link to={`/shop/${sellerId}`} className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-[#0d8f62]">{sellerNames[sellerId] || "Verified seller"}<BadgeCheck size={14} className="fill-[#0d8f62] text-white" /></Link>
        <Link to={`/product/${id}`}><h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#0b2442] group-hover:text-[#0d8f62]">{name}</h3></Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-base font-black text-[#0b2442]">{currency}{Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500"><Star size={13} className="fill-[#f4b400] text-[#f4b400]" /> {Number(rating).toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductItems;
