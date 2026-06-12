import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  ChevronRight,
  Headphones,
  Home as HomeIcon,
  Laptop,
  MapPin,
  Palette,
  Search,
  ShieldCheck,
  Shirt,
  Sparkles,
  Star,
  Store,
  Truck,
} from "lucide-react";
import { assets } from "../assets/assets";
import { useStore } from "../context/store";
import ProductItems from "../components/ProductItems";

const categories = [
  { name: "Fashion", icon: Shirt, color: "bg-rose-50 text-rose-600" },
  { name: "Electronics", icon: Laptop, color: "bg-blue-50 text-blue-600" },
  { name: "Beauty", icon: Sparkles, color: "bg-amber-50 text-amber-600" },
  { name: "Home & Living", icon: HomeIcon, color: "bg-emerald-50 text-emerald-600" },
  { name: "Art & Crafts", icon: Palette, color: "bg-violet-50 text-violet-600" },
  { name: "All Categories", icon: Box, color: "bg-slate-100 text-slate-700" },
];

const stores = [
  { name: "Ama Heritage", location: "Accra", image: assets.AfricanFabric, rating: "4.9", products: "128" },
  { name: "Bolga Craft House", location: "Bolgatanga", image: assets.BolgaMarketBasket, rating: "4.8", products: "76" },
  { name: "Asante Woodworks", location: "Kumasi", image: assets.WoodenUnityStatue, rating: "4.9", products: "54" },
];

const SectionHeading = ({ eyebrow, title, copy, link = "/collections" }) => (
  <div className="mb-7 flex items-end justify-between gap-4">
    <div>
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0d8f62]">{eyebrow}</p>
      <h2 className="text-2xl font-extrabold text-[#0b2442] sm:text-3xl">{title}</h2>
      {copy && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{copy}</p>}
    </div>
    <Link to={link} className="hidden shrink-0 items-center gap-1 text-sm font-bold text-[#0d8f62] sm:flex">View all <ChevronRight size={17} /></Link>
  </div>
);

const Home = () => {
  const products = useStore((state) => state.products);
  const featuredProductIds = ["0014", "0031", "0028", "0013", "0033", "0026", "0003", "0008"];
  const featured = featuredProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);
  const trending = products.filter((product) => product.bestSeller).slice(0, 4);

  return (
    <div className="bg-[#f7f9fc] pb-16">
      <section className="bg-[#0d2f57]">
        <div className="gmp-container grid min-h-[470px] items-center gap-10 py-10 lg:grid-cols-[1.05fr_.95fr] lg:py-0">
          <div className="relative z-10 text-white">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-[#f4b400]" /> Ghana's verified marketplace
            </span>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] sm:text-5xl lg:text-6xl">
              Shop Ghana.<br /><span className="text-[#f4b400]">Shop with confidence.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
              Discover quality products from trusted Ghanaian businesses, all verified by our local team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/collections" className="inline-flex items-center gap-2 rounded-xl bg-[#0d8f62] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0aa06d]">Explore marketplace <ArrowRight size={18} /></Link>
              <Link to="/book-shop-verification" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"><Store size={18} /> Book verification</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-blue-100">
              <span className="flex items-center gap-2"><BadgeCheck size={17} className="text-[#f4b400]" /> Verified sellers</span>
              <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#f4b400]" /> Secure payments</span>
              <span className="flex items-center gap-2"><MapPin size={17} className="text-[#f4b400]" /> Shops across Ghana</span>
            </div>
          </div>
          <div className="relative hidden h-[470px] lg:block">
            <div className="absolute inset-8 right-0 overflow-hidden rounded-t-[5rem] rounded-bl-[5rem] border border-white/10 bg-[#123d70]">
              <img src={assets.Hero} alt="Handmade Ghanaian products" className="h-full w-full object-cover opacity-90 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081d3a]/70 via-transparent to-[#0d8f62]/20" />
            </div>
            <div className="absolute bottom-12 left-0 rounded-2xl bg-white p-4 text-[#0b2442] shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-[#0d8f62]"><BadgeCheck /></span>
                <div><p className="text-xs text-slate-500">Every store checked</p><p className="font-extrabold">GMP Verified</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gmp-container relative -mt-1 sm:-mt-7">
        <div className="grid rounded-2xl bg-white px-4 py-5 shadow-[0_16px_50px_rgba(15,23,42,0.12)] sm:grid-cols-3 sm:px-7">
          {[
            [ShieldCheck, "Verified businesses", "Identity and shop location checked"],
            [Truck, "Delivery across Ghana", "Flexible options from local sellers"],
            [Headphones, "Real local support", "Help when an order needs attention"],
          ].map(([icon, title, copy], index) => (
            <div key={title} className={`flex items-center gap-4 px-4 py-3 ${index > 0 ? "sm:border-l sm:border-slate-100" : ""}`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-[#0d8f62]">{createElement(icon, { size: 21 })}</span>
              <div><p className="text-sm font-extrabold text-[#0b2442]">{title}</p><p className="mt-1 text-xs text-slate-500">{copy}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="gmp-container py-14">
        <SectionHeading eyebrow="Browse faster" title="Shop by category" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, icon, color }) => (
            <Link key={name} to="/collections" className="group rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${color}`}>{createElement(icon, { size: 25 })}</span>
              <p className="mt-4 text-sm font-extrabold text-[#0b2442] group-hover:text-[#0d8f62]">{name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="deals" className="gmp-container pb-14">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <div className="relative min-h-72 overflow-hidden rounded-3xl bg-[#f4b400] p-8 sm:p-10">
            <div className="relative z-10 max-w-md">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b2442]/60">Made in Ghana spotlight</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0b2442] sm:text-4xl">Authentic craft.<br />Remarkable stories.</h2>
              <p className="mt-4 text-sm leading-6 text-[#0b2442]/75">Meet the makers behind Ghana's finest textiles, baskets, jewellery and homeware.</p>
              <Link to="/collections" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b2442] px-5 py-3 text-sm font-bold text-white">Shop local craft <ArrowRight size={17} /></Link>
            </div>
            <img src={assets.BolgaMarketBasket} alt="Bolga basket" className="absolute -bottom-16 -right-12 h-80 w-80 rotate-[-8deg] rounded-full object-cover shadow-2xl sm:right-4" />
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-3xl bg-[#0d8f62] p-8 text-white">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Seller of the week</p>
            <h3 className="mt-3 text-2xl font-black">Ama Heritage</h3>
            <p className="mt-2 text-sm text-emerald-50">Contemporary fashion rooted in Ghanaian textiles.</p>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold"><BadgeCheck size={18} className="text-[#f4b400]" /> Verified in Accra</div>
            <Link to="/shop/2" className="absolute bottom-8 left-8 inline-flex items-center gap-2 text-sm font-bold">Visit store <ArrowRight size={17} /></Link>
            <img src={assets.LadiesFuguSmock} alt="Ghanaian fashion" className="absolute -bottom-12 -right-8 h-52 w-44 rotate-6 rounded-3xl object-cover opacity-90 shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="gmp-container pb-14">
        <SectionHeading eyebrow="Fresh finds" title="Featured products" copy="Quality products selected from active, verified Ghanaian stores." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {featured.map((product) => <ProductItems key={product.id} {...product} />)}
        </div>
      </section>

      <section id="verified-stores" className="bg-[#edf3f8] py-14">
        <div className="gmp-container">
          <SectionHeading eyebrow="Trusted near you" title="Featured verified stores" copy="Real Ghanaian businesses reviewed by the GMP verification team." />
          <div className="grid gap-5 md:grid-cols-3">
            {stores.map((store, index) => (
              <Link to={`/shop/${index + 1}`} key={store.name} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="h-36 overflow-hidden"><img src={store.image} alt={store.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="relative p-5 pt-7">
                  <span className="absolute -top-5 left-5 grid h-11 w-11 place-items-center rounded-xl border-4 border-white bg-[#0d8f62] text-white"><Store size={20} /></span>
                  <div className="flex items-start justify-between gap-3">
                    <div><h3 className="flex items-center gap-1.5 font-extrabold text-[#0b2442]">{store.name}<BadgeCheck size={17} className="fill-[#0d8f62] text-white" /></h3><p className="mt-1 text-xs text-slate-500">{store.location} · {store.products} products</p></div>
                    <span className="flex items-center gap-1 text-xs font-bold"><Star size={14} className="fill-[#f4b400] text-[#f4b400]" /> {store.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gmp-container py-14">
        <SectionHeading eyebrow="Popular this week" title="Trending on GMP" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{trending.map((product) => <ProductItems key={product.id} {...product} />)}</div>
      </section>

      <section className="gmp-container">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-[#0b2442] px-7 py-10 text-white md:grid-cols-[1fr_auto] md:px-12">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#f4b400]">Grow your business online</p><h2 className="mt-3 text-3xl font-black">Your store deserves a bigger market.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">Create a storefront, accept secure payments and reach buyers across Ghana without building your own website.</p></div>
          <Link to="/book-shop-verification" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4b400] px-6 py-3.5 text-sm font-extrabold text-[#0b2442]">Book a shop visit <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
