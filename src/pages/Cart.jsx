import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
} from "lucide-react";
import { useCartStore } from "../context/cartStore";
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

const displayVariant = (variant) => {
  if (!variant || variant === "Default" || variant === "Standard") return "";
  return variant.replace(/^Size: Standard(?: · )?/, "");
};

const Cart = () => {
  const products = useStore((state) => state.products);
  const currency = useStore((state) => state.Currency);
  const deliveryFee = useStore((state) => state.delivery_fee);
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const cartData = useMemo(() => {
    const items = [];
    Object.entries(cartItems).forEach(([productId, variants]) => {
      const product = products.find((candidate) => candidate.id === productId);
      if (!product) return;
      Object.entries(variants).forEach(([variant, quantity]) => {
        if (quantity > 0) items.push({ product, variant, quantity });
      });
    });
    return items;
  }, [cartItems, products]);

  const sellerGroups = useMemo(() => cartData.reduce((groups, item) => {
    const sellerId = item.product.sellerId || "marketplace";
    if (!groups[sellerId]) groups[sellerId] = [];
    groups[sellerId].push(item);
    return groups;
  }, {}), [cartData]);

  const subtotal = cartData.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = Object.keys(sellerGroups).length * deliveryFee;
  const total = subtotal + shipping;

  if (!cartData.length) {
    return (
      <section className="grid min-h-[620px] place-items-center bg-[#f4f7fa] px-4 py-16">
        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-[#0d8f62]"><ShoppingBag size={30} /></span>
          <h1 className="mt-6 text-3xl font-black text-[#071a33]">Your cart is ready for something good</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Browse products from verified Ghanaian businesses and add your favourites.</p>
          <Link to="/collections" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0d8f62] px-6 py-3 text-sm font-extrabold text-white">Continue shopping <ArrowRight size={17} /></Link>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-[#f4f7fa] pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="gmp-container flex flex-col justify-between gap-4 py-9 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d8f62]">Your basket</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#071a33] sm:text-4xl">Shopping cart</h1>
            <p className="mt-2 text-sm text-slate-500">{cartData.length} product selection{cartData.length === 1 ? "" : "s"} from {Object.keys(sellerGroups).length} verified store{Object.keys(sellerGroups).length === 1 ? "" : "s"}.</p>
          </div>
          <Link to="/collections" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0d8f62]">Continue shopping <ArrowRight size={17} /></Link>
        </div>
      </section>

      <div className="gmp-container grid items-start gap-7 py-10 lg:grid-cols-[1.25fr_.75fr]">
        <div className="space-y-5">
          {Object.entries(sellerGroups).map(([sellerId, items]) => (
            <section key={sellerId} className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#071a33]"><Store size={18} className="text-[#0d8f62]" /> {sellerNames[sellerId] || "Verified seller"}<BadgeCheck size={16} className="fill-[#0d8f62] text-white" /></div>
                <span className="text-xs font-semibold text-slate-400">{items.length} item{items.length === 1 ? "" : "s"}</span>
              </div>

              <div className="divide-y divide-slate-100">
                {items.map(({ product, variant, quantity }) => {
                  const optionLabel = displayVariant(variant);
                  return (
                    <article key={`${product.id}-${variant}`} className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:p-7">
                      <div className="flex gap-4">
                        <Link to={`/product/${product.id}`} className="product-media-frame h-24 w-24 shrink-0 rounded-2xl border border-slate-100 sm:h-28 sm:w-28"><img src={product.image[0]} alt={product.name} className="product-media-thumb" /></Link>
                        <div className="min-w-0 py-1">
                          <Link to={`/product/${product.id}`} className="line-clamp-2 text-base font-extrabold leading-6 text-[#071a33] hover:text-[#0d8f62]">{product.name}</Link>
                          {optionLabel && <p className="mt-2 text-xs font-semibold text-slate-500">{optionLabel}</p>}
                          <p className="mt-3 text-lg font-black text-[#071a33]">{currency}{product.price.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:justify-center">
                        <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                          <button type="button" onClick={() => decreaseQuantity(product.id, variant)} className="grid h-10 w-10 place-items-center text-slate-500 transition hover:bg-slate-50" aria-label="Decrease quantity"><Minus size={15} /></button>
                          <span className="grid h-10 min-w-10 place-items-center border-x border-slate-200 text-sm font-extrabold text-[#071a33]">{quantity}</span>
                          <button type="button" onClick={() => addToCart(product.id, variant)} className="grid h-10 w-10 place-items-center text-slate-500 transition hover:bg-slate-50" aria-label="Increase quantity"><Plus size={15} /></button>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-black text-[#071a33]">{currency}{(product.price * quantity).toLocaleString()}</p>
                          <button type="button" onClick={() => removeFromCart(product.id, variant)} className="grid h-9 w-9 place-items-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500" aria-label={`Remove ${product.name}`}><Trash2 size={17} /></button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"><ShieldCheck size={22} className="shrink-0 text-[#0d8f62]" /><div><p className="text-sm font-extrabold text-[#071a33]">Buyer protection</p><p className="mt-1 text-xs leading-5 text-slate-500">Eligible payments are held until delivery is confirmed.</p></div></div>
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"><Truck size={22} className="shrink-0 text-[#0d8f62]" /><div><p className="text-sm font-extrabold text-[#071a33]">Delivery by store</p><p className="mt-1 text-xs leading-5 text-slate-500">Each verified seller prepares and dispatches their items.</p></div></div>
          </div>
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-28 sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-[#0d8f62]"><PackageCheck size={20} /></span><div><p className="text-xs font-black uppercase tracking-[0.15em] text-[#0d8f62]">Order summary</p><h2 className="text-xl font-black text-[#071a33]">Review your total</h2></div></div>
          <div className="space-y-4 py-6 text-sm">
            <div className="flex justify-between text-slate-500"><span>Products subtotal</span><span>{currency}{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-slate-500"><span>Estimated delivery</span><span>{currency}{shipping.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-5 text-xl font-black text-[#071a33]"><span>Total</span><span>{currency}{total.toFixed(2)}</span></div>
          </div>
          <button onClick={() => navigate("/place-order")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d8f62] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#087653]">Proceed to checkout <ArrowRight size={18} /></button>
          <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">Delivery options and payment method are selected at checkout.</p>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
