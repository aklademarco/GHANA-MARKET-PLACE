import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
} from "lucide-react";
import { assets } from "../assets/assets";

const DotPattern = ({ dark = false, className = "" }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute h-48 w-48 opacity-60 ${className}`}
    style={{
      backgroundImage: `radial-gradient(${dark ? "#0b2442" : "#f4b400"} 2px, transparent 2px)`,
      backgroundSize: "15px 15px",
    }}
  />
);

const About = () => {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative min-h-[620px] border-b border-slate-100">
        <DotPattern className="-left-16 top-16" />
        <DotPattern dark className="-bottom-14 -right-14" />
        <div className="gmp-container relative z-10 grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#0d8f62]">
              <span className="h-2 w-2 rounded-full bg-[#f4b400]" /> About Ghana Market Place
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.055em] text-[#071a33] sm:text-6xl lg:text-7xl">
              Ghana's marketplace,
              <span className="block text-[#0d8f62]">built on trust.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              GMP helps people discover and buy from verified Ghanaian businesses, while giving local sellers everything they need to trade online.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collections" className="inline-flex items-center gap-2 rounded-xl bg-[#071a33] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#0d2f57]">
                Explore the marketplace <ArrowRight size={18} />
              </Link>
              <Link to="/book-shop-verification" className="inline-flex items-center gap-2 rounded-xl border-2 border-[#071a33] px-6 py-3 text-sm font-extrabold text-[#071a33] transition hover:bg-slate-50">
                Book verification
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full pb-12 lg:pb-0">
            <div className="ml-auto aspect-[3/2] w-full overflow-hidden rounded-[2.5rem] border border-slate-100 bg-[#fffdf8] p-3 shadow-2xl sm:p-5">
              <img src={assets.AboutImage} alt="Ghana Market Place connecting verified shops, customers and delivery" className="h-full w-full object-contain" />
            </div>
            <div className="absolute -bottom-2 left-4 w-64 rounded-2xl bg-[#f4b400] p-5 text-[#071a33] shadow-xl sm:left-8 sm:w-72 sm:p-6">
              <ShieldCheck size={30} />
              <p className="mt-4 text-2xl font-black leading-tight">Every seller earns trust before they sell.</p>
            </div>
            <div className="absolute right-4 top-4 grid h-16 w-16 place-items-center rounded-full border-8 border-white bg-[#0d8f62] text-white shadow-lg sm:h-20 sm:w-20">
              <BadgeCheck size={34} />
            </div>
          </div>
        </div>
      </section>

      <section className="gmp-container py-20 lg:py-28">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#f4f7fa] lg:grid-cols-[.78fr_1.22fr]">
          <div className="relative flex min-h-[520px] flex-col justify-between p-8 sm:p-12 lg:p-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d8f62]">Our vision</p>
              <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.04em] text-[#071a33] sm:text-5xl">
                Your business.<br />Your customers.<br />One trusted market.
              </h2>
              <p className="mt-8 max-w-md text-base leading-7 text-slate-600">
                We are building the largest digital marketplace connecting customers to verified Ghanaian businesses, from established shops to emerging makers.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-3 text-sm font-extrabold text-[#071a33]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f4b400]"><MapPin size={20} /></span>
              Built in Ghana, for Ghanaian commerce.
            </div>
            <DotPattern dark className="-bottom-16 -left-12 opacity-20" />
          </div>
          <div className="relative flex min-h-[420px] items-center bg-[#fffdf8] p-4 sm:p-7 lg:min-h-[620px]">
            <img src={assets.OurVision} alt="GMP vision for verified stores, secure checkout and reliable delivery" className="h-full max-h-[580px] w-full object-contain" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-[#071a33]/90 p-5 text-white shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs">
              <p className="text-sm leading-6">From Accra to Tamale, Kumasi to Takoradi, good businesses deserve to be easier to find.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#071a33] py-20 text-white lg:py-28">
        <DotPattern className="-left-12 top-20 opacity-25" />
        <div className="gmp-container relative z-10">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f4b400]">Why choose GMP?</p>
              <h2 className="mt-5 text-4xl font-black leading-none tracking-[-0.04em] sm:text-5xl">Trust is not an extra feature. It is the foundation.</h2>
              <p className="mt-6 max-w-md leading-7 text-blue-100/70">Social commerce makes selling easy, but proving who to trust can be difficult. GMP brings verification, discovery and buying together.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2">
              {[
                [ShieldCheck, "Verified sellers", "Businesses are reviewed before they are approved to sell on GMP."],
                [Search, "Everything in one place", "Search, compare and discover products from many local stores."],
                [ShoppingBag, "Protected purchases", "Orders, payments and delivery progress stay visible and accountable."],
                [Store, "Built for local business", "Sellers get a storefront without needing to build their own website."],
              ].map(([icon, title, copy]) => (
                <div key={title} className="bg-[#0a2445] p-7 sm:p-9">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0d8f62] text-white">{createElement(icon, { size: 23 })}</span>
                  <h3 className="mt-6 text-xl font-extrabold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-blue-100/65">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gmp-container py-20 lg:py-28">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d8f62]">How verification works</p>
          <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] text-[#071a33] sm:text-5xl">Real businesses.<br />Checked by real people.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["01", Building2, "Seller applies", "The business submits its identity, location, contact details and shop photos."],
            ["02", MapPin, "GMP verifies", "Our team calls the seller, reviews their details and confirms the business exists."],
            ["03", BadgeCheck, "Store goes live", "Approved businesses receive a verified badge and can begin selling."],
          ].map(([number, icon, title, copy]) => (
            <article key={number} className="relative min-h-72 overflow-hidden rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:shadow-xl sm:p-9">
              <p className="text-6xl font-black text-slate-100">{number}</p>
              <span className="absolute right-7 top-8 grid h-12 w-12 place-items-center rounded-full bg-[#f4b400] text-[#071a33]">{createElement(icon, { size: 22 })}</span>
              <h3 className="mt-10 text-2xl font-black text-[#071a33]">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f4b400] py-20 lg:py-24">
        <div className="gmp-container grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#071a33]/60">Made for both sides of the market</p>
            <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-[#071a33] sm:text-5xl">Better for buyers.<br />Bigger for businesses.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-7">
              <ShoppingBag className="text-[#0d8f62]" size={28} />
              <h3 className="mt-5 text-xl font-black text-[#071a33]">For buyers</h3>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                {["Find trusted local sellers", "Compare products and prices", "Shop multiple stores in one place"].map((item) => <p key={item} className="flex gap-2"><Check size={17} className="shrink-0 text-[#0d8f62]" /> {item}</p>)}
              </div>
            </div>
            <div className="rounded-2xl bg-[#071a33] p-7 text-white">
              <Store className="text-[#f4b400]" size={28} />
              <h3 className="mt-5 text-xl font-black">For sellers</h3>
              <div className="mt-5 space-y-3 text-sm text-blue-100/70">
                {["Launch a professional storefront", "Reach customers beyond social media", "Manage products, orders and payouts"].map((item) => <p key={item} className="flex gap-2"><Check size={17} className="shrink-0 text-[#f4b400]" /> {item}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32">
        <DotPattern dark className="-left-10 bottom-0 opacity-20" />
        <div className="gmp-container relative z-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d8f62]">Get started today</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#071a33] sm:text-6xl lg:text-7xl">Find your next purchase.<br />Or your next customer.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/collections" className="inline-flex items-center gap-2 rounded-xl bg-[#0d8f62] px-7 py-4 text-sm font-extrabold text-white">Start shopping <ArrowRight size={18} /></Link>
            <Link to="/book-shop-verification" className="inline-flex items-center gap-2 rounded-xl bg-[#071a33] px-7 py-4 text-sm font-extrabold text-white">Book a shop visit <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
