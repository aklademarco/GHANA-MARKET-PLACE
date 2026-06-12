import { createElement, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BadgeCheck,
  Banknote,
  ChevronRight,
  CircleCheck,
  CreditCard,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Store,
  Truck,
  UserRound,
} from "lucide-react";
import { useStore } from "../context/store";
import { useCartStore } from "../context/cartStore";

const sellerNames = {
  "1": "Bolga Craft House",
  "2": "Ama Heritage",
  "3": "Asante Woodworks",
  "4": "Northern Loom",
  "5": "Accra Digital Hub",
  "6": "HomeTech Ghana",
  "7": "Prime Furniture GH",
};

const regions = [
  "Greater Accra", "Ashanti", "Central", "Eastern", "Western", "Western North",
  "Volta", "Oti", "Bono", "Bono East", "Ahafo", "Northern", "Savannah",
  "North East", "Upper East", "Upper West",
];

const PlaceOrder = () => {
  const products = useStore((state) => state.products);
  const currency = useStore((state) => state.Currency);
  const deliveryFee = useStore((state) => state.delivery_fee);
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    address: "",
    digitalAddress: "",
    landmark: "",
  });

  const checkoutItems = useMemo(() => {
    const items = [];
    Object.entries(cartItems).forEach(([productId, sizes]) => {
      const product = products.find((candidate) => candidate.id === productId);
      if (!product) return;
      Object.entries(sizes).forEach(([variant, quantity]) => {
        if (quantity > 0) items.push({ product, variant, quantity });
      });
    });
    return items;
  }, [cartItems, products]);

  const sellerGroups = useMemo(() => {
    return checkoutItems.reduce((groups, item) => {
      const sellerId = item.product.sellerId || "marketplace";
      if (!groups[sellerId]) groups[sellerId] = [];
      groups[sellerId].push(item);
      return groups;
    }, {});
  }, [checkoutItems]);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const sellerCount = Object.keys(sellerGroups).length;
  const standardShipping = sellerCount * deliveryFee;
  const shipping = deliveryMethod === "express" ? standardShipping + 25 : standardShipping;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const required = ["firstName", "lastName", "email", "phone", "region", "city", "address"];
    if (required.some((field) => !formData[field].trim())) {
      toast.error("Please complete your delivery information.");
      return;
    }
    if (!checkoutItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    toast.success("Order placed successfully. Payment confirmation is pending.");
    clearCart();
    setTimeout(() => navigate("/orders"), 1200);
  };

  if (!checkoutItems.length) {
    return (
      <section className="grid min-h-[620px] place-items-center bg-[#f4f7fa] px-4 py-16">
        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-[#0d8f62]"><PackageCheck size={31} /></span>
          <h1 className="mt-6 text-3xl font-black text-[#071a33]">Your cart is empty</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Add products from verified Ghanaian stores before continuing to checkout.</p>
          <Link to="/collections" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0d8f62] px-6 py-3 text-sm font-extrabold text-white">Browse products <ChevronRight size={17} /></Link>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-[#f4f7fa] pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="gmp-container py-8 sm:py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d8f62]">Secure checkout</p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#071a33] sm:text-4xl">Complete your order</h1>
              <p className="mt-2 text-sm text-slate-500">Products are grouped and fulfilled by each verified seller.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5 text-[#0d8f62]"><CircleCheck size={17} /> Cart</span>
              <span className="h-px w-7 bg-slate-300" />
              <span className="flex items-center gap-1.5 text-[#0d8f62]"><CircleCheck size={17} /> Delivery</span>
              <span className="h-px w-7 bg-slate-300" />
              <span className="flex items-center gap-1.5"><LockKeyhole size={16} /> Payment</span>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="gmp-container grid items-start gap-7 py-10 lg:grid-cols-[1.08fr_.92fr]">
        <div className="space-y-6">
          <CheckoutCard number="1" title="Contact and delivery address" icon={MapPin}>
            <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-[#f4f7fa] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0d8f62]"><UserRound size={19} /></span>
                <div><p className="text-sm font-extrabold text-[#071a33]">Have a buyer account?</p><p className="text-xs text-slate-500">Sign in to use a saved address.</p></div>
              </div>
              <Link to="/login" state={{ from: "/place-order" }} className="text-sm font-extrabold text-[#0d8f62]">Sign in</Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name *" name="firstName" value={formData.firstName} onChange={handleChange} />
              <Field label="Last name *" name="lastName" value={formData.lastName} onChange={handleChange} />
              <Field label="Email address *" name="email" type="email" value={formData.email} onChange={handleChange} />
              <Field label="Phone number *" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+233 24 000 0000" />
              <label>
                <span className="mb-2 block text-sm font-bold text-slate-700">Region *</span>
                <select name="region" value={formData.region} onChange={handleChange} className="checkout-input bg-white">
                  <option value="">Select region</option>
                  {regions.map((region) => <option key={region}>{region}</option>)}
                </select>
              </label>
              <Field label="Town / city *" name="city" value={formData.city} onChange={handleChange} />
              <div className="sm:col-span-2"><Field label="Street or delivery address *" name="address" value={formData.address} onChange={handleChange} placeholder="House number, street and area" /></div>
              <Field label="GhanaPost GPS address" name="digitalAddress" value={formData.digitalAddress} onChange={handleChange} placeholder="e.g. GA-123-4567" />
              <Field label="Nearest landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
            </div>
          </CheckoutCard>

          <CheckoutCard number="2" title="Delivery option" icon={Truck}>
            <div className="grid gap-3 sm:grid-cols-2">
              <OptionCard
                selected={deliveryMethod === "standard"}
                onClick={() => setDeliveryMethod("standard")}
                title="Standard delivery"
                copy="Estimated 2–5 business days"
                price={`${currency}${standardShipping.toFixed(2)}`}
              />
              <OptionCard
                selected={deliveryMethod === "express"}
                onClick={() => setDeliveryMethod("express")}
                title="Express delivery"
                copy="Estimated 1–2 business days"
                price={`${currency}${(standardShipping + 25).toFixed(2)}`}
              />
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">Delivery is calculated per seller because products may leave from different shops.</p>
          </CheckoutCard>

          <CheckoutCard number="3" title="Payment method" icon={CreditCard}>
            <div className="grid gap-3 sm:grid-cols-3">
              <PaymentCard selected={paymentMethod === "momo"} onClick={() => setPaymentMethod("momo")} icon={Smartphone} title="Mobile Money" copy="MTN, Telecel" />
              <PaymentCard selected={paymentMethod === "card"} onClick={() => setPaymentMethod("card")} icon={CreditCard} title="Debit / credit card" copy="Visa, Mastercard" />
              <PaymentCard selected={paymentMethod === "cod"} onClick={() => setPaymentMethod("cod")} icon={Banknote} title="Pay on delivery" copy="Eligible locations" />
            </div>
            <div className="mt-5 flex gap-3 rounded-2xl bg-emerald-50 p-4 text-xs leading-5 text-emerald-900">
              <ShieldCheck size={20} className="shrink-0" /> GMP holds eligible payments until delivery is confirmed, helping protect both buyer and seller.
            </div>
          </CheckoutCard>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div><p className="text-xs font-black uppercase tracking-[0.15em] text-[#0d8f62]">Order review</p><h2 className="mt-1 text-xl font-black text-[#071a33]">{checkoutItems.length} item{checkoutItems.length === 1 ? "" : "s"}</h2></div>
              <Link to="/cart" className="text-xs font-extrabold text-[#0d8f62]">Edit cart</Link>
            </div>

            <div className="max-h-[500px] divide-y divide-slate-100 overflow-y-auto">
              {Object.entries(sellerGroups).map(([sellerId, items]) => (
                <div key={sellerId} className="p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs font-extrabold text-[#071a33]">
                    <Store size={16} className="text-[#0d8f62]" /> {sellerNames[sellerId] || "Verified seller"}
                    <BadgeCheck size={15} className="fill-[#0d8f62] text-white" />
                  </div>
                  <div className="space-y-4">
                    {items.map(({ product, variant, quantity }) => (
                      <div key={`${product.id}-${variant}`} className="flex gap-3">
                        <div className="product-media-frame h-16 w-16 shrink-0 rounded-xl border border-slate-100"><img src={product.image[0]} alt={product.name} className="product-media-thumb" /></div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold leading-5 text-[#071a33]">{product.name}</p>
                          <p className="mt-1 text-xs text-slate-400">{variant !== "Default" && variant !== "Standard" ? `${variant} · ` : ""}Qty {quantity}</p>
                        </div>
                        <p className="shrink-0 text-sm font-extrabold text-[#071a33]">{currency}{(product.price * quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-[#f8fafc] p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-500"><span>Products subtotal</span><span>{currency}{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-500"><span>Delivery ({sellerCount} store{sellerCount === 1 ? "" : "s"})</span><span>{currency}{shipping.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-black text-[#071a33]"><span>Total</span><span>{currency}{total.toFixed(2)}</span></div>
              </div>
              <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d8f62] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#087653]">
                <LockKeyhole size={17} /> Place order securely
              </button>
              <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">By placing this order, you agree to GMP's buyer protection, delivery and refund policies.</p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
};

const CheckoutCard = ({ number, title, icon, children }) => (
  <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
    <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#071a33] text-sm font-black text-white">{number}</span>
      {createElement(icon, { size: 21, className: "text-[#0d8f62]" })}
      <h2 className="text-xl font-black text-[#071a33]">{title}</h2>
    </div>
    {children}
  </section>
);

const Field = ({ label, ...props }) => (
  <label>
    <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
    <input {...props} className="checkout-input" />
  </label>
);

const OptionCard = ({ selected, onClick, title, copy, price }) => (
  <button type="button" onClick={onClick} className={`rounded-2xl border-2 p-4 text-left transition ${selected ? "border-[#0d8f62] bg-emerald-50" : "border-slate-200 hover:border-slate-300"}`}>
    <span className="flex items-start justify-between gap-3"><span><strong className="block text-sm text-[#071a33]">{title}</strong><span className="mt-1 block text-xs text-slate-500">{copy}</span></span><span className="text-sm font-black text-[#071a33]">{price}</span></span>
  </button>
);

const PaymentCard = ({ selected, onClick, icon, title, copy }) => (
  <button type="button" onClick={onClick} className={`rounded-2xl border-2 p-4 text-left transition ${selected ? "border-[#0d8f62] bg-emerald-50" : "border-slate-200 hover:border-slate-300"}`}>
    {createElement(icon, { size: 22, className: selected ? "text-[#0d8f62]" : "text-slate-400" })}
    <strong className="mt-4 block text-sm text-[#071a33]">{title}</strong>
    <span className="mt-1 block text-xs text-slate-500">{copy}</span>
  </button>
);

export default PlaceOrder;
