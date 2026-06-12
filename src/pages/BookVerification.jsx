import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Camera,
  Check,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  UserRound,
} from "lucide-react";

const initialForm = {
  businessName: "",
  ownerName: "",
  phone: "",
  alternatePhone: "",
  category: "",
  region: "",
  town: "",
  digitalAddress: "",
  landmark: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

const BookVerification = () => {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.businessName ||
      !formData.ownerName ||
      !formData.phone ||
      !formData.category ||
      !formData.region ||
      !formData.town ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      toast.error("Please complete all required appointment details.");
      return;
    }

    setSubmitted(true);
    toast.success("Your shop verification request has been received.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section className="grid min-h-[680px] place-items-center bg-[#f4f7fa] px-4 py-20">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-[#0d8f62]">
            <BadgeCheck size={42} />
          </span>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#0d8f62]">Appointment request received</p>
          <h1 className="mt-4 text-3xl font-black text-[#071a33] sm:text-4xl">We will call you before visiting.</h1>
          <p className="mx-auto mt-5 max-w-lg leading-7 text-slate-600">
            The GMP verification team will contact {formData.ownerName} on {formData.phone} to confirm the appointment and directions to {formData.businessName} in {formData.town}.
          </p>
          <div className="mt-8 rounded-2xl bg-[#f4f7fa] p-5 text-left text-sm text-slate-600">
            <p className="font-extrabold text-[#071a33]">Requested visit</p>
            <p className="mt-2">{formData.preferredDate} · {formData.preferredTime}</p>
            <p className="mt-1">{formData.town}, {formData.region}</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-xl bg-[#071a33] px-6 py-3 text-sm font-extrabold text-white">Return home</Link>
            <button onClick={() => { setSubmitted(false); setFormData(initialForm); }} className="rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-extrabold text-[#071a33]">Book another shop</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-[#f4f7fa]">
      <section className="bg-[#071a33] py-16 text-white lg:py-20">
        <div className="gmp-container grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#f4b400]">
              <ShieldCheck size={17} /> Sell on Ghana Market Place
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Book a visit.<br />Get your shop verified.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-blue-100/75 sm:text-lg">
              You do not need to create a seller account yet. Tell us about your business and our team will visit your physical shop before your GMP store is approved.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [Phone, "1. We call", "We confirm your details and visit time."],
              [MapPin, "2. We visit", "A GMP representative comes to your shop."],
              [BadgeCheck, "3. We verify", "Approved businesses receive a verified store."],
            ].map(([icon, title, copy]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0d8f62]">{createElement(icon, { size: 21 })}</span>
                <div><p className="font-extrabold">{title}</p><p className="mt-1 text-xs leading-5 text-blue-100/60">{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gmp-container grid gap-8 py-14 lg:grid-cols-[.68fr_1.32fr] lg:py-20">
        <aside className="h-fit rounded-3xl bg-[#f4b400] p-7 text-[#071a33] lg:sticky lg:top-28 sm:p-9">
          <Store size={34} />
          <h2 className="mt-5 text-2xl font-black">Prepare for the shop visit</h2>
          <p className="mt-3 text-sm leading-6 text-[#071a33]/70">Please make sure the owner or an authorised representative is available.</p>
          <div className="mt-7 space-y-4 text-sm font-semibold">
            {[
              "Your Ghana Card or valid ID",
              "The physical shop must be open",
              "Products should be available to inspect",
              "Business registration, if available",
              "Permission to take verification photos",
            ].map((item) => <p key={item} className="flex gap-3"><Check size={18} className="shrink-0" /> {item}</p>)}
          </div>
          <div className="mt-8 border-t border-[#071a33]/15 pt-6">
            <p className="text-xs font-black uppercase tracking-wider">Already verified?</p>
            <Link to="/login" className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold">Sign in to Seller Centre <ArrowRight size={17} /></Link>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm sm:p-9 lg:p-10">
          <div className="border-b border-slate-100 pb-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d8f62]">Shop visit request</p>
            <h2 className="mt-3 text-3xl font-black text-[#071a33]">Book your verification appointment</h2>
            <p className="mt-2 text-sm text-slate-500">Fields marked with * are required. Our team will call before travelling to your location.</p>
          </div>

          <div className="mt-8 space-y-9">
            <fieldset>
              <legend className="flex items-center gap-2 text-lg font-extrabold text-[#071a33]"><Building2 size={21} className="text-[#0d8f62]" /> Business details</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Business name *" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g. Ama Fashion House" />
                <SelectField label="Business category *" name="category" value={formData.category} onChange={handleChange} options={["Fashion", "Electronics", "Beauty & cosmetics", "Home & living", "Furniture", "Hardware", "Automotive", "Manufacturing", "Wholesale", "Other"]} />
                <Field label="Owner / contact person *" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Full name" icon={UserRound} />
                <Field label="Primary phone number *" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233 24 000 0000" type="tel" icon={Phone} />
                <Field label="Alternative phone" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} placeholder="Optional" type="tel" />
              </div>
            </fieldset>

            <fieldset className="border-t border-slate-100 pt-8">
              <legend className="flex items-center gap-2 text-lg font-extrabold text-[#071a33]"><MapPin size={21} className="text-[#0d8f62]" /> Shop location</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <SelectField label="Region *" name="region" value={formData.region} onChange={handleChange} options={["Greater Accra", "Ashanti", "Central", "Eastern", "Western", "Western North", "Volta", "Oti", "Bono", "Bono East", "Ahafo", "Northern", "Savannah", "North East", "Upper East", "Upper West"]} />
                <Field label="Town / area *" name="town" value={formData.town} onChange={handleChange} placeholder="e.g. Madina" />
                <Field label="GhanaPost GPS address" name="digitalAddress" value={formData.digitalAddress} onChange={handleChange} placeholder="e.g. GA-123-4567" />
                <Field label="Nearest landmark" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Help us find the shop" />
              </div>
            </fieldset>

            <fieldset className="border-t border-slate-100 pt-8">
              <legend className="flex items-center gap-2 text-lg font-extrabold text-[#071a33]"><CalendarDays size={21} className="text-[#0d8f62]" /> Preferred appointment</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Preferred visit date *" name="preferredDate" value={formData.preferredDate} onChange={handleChange} type="date" min={new Date().toISOString().split("T")[0]} />
                <SelectField label="Preferred time *" name="preferredTime" value={formData.preferredTime} onChange={handleChange} icon={Clock3} options={["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"]} />
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Directions or additional notes</span>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" placeholder="Opening hours, detailed directions, or anything our verification team should know" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0d8f62] focus:ring-3 focus:ring-emerald-100" />
                </label>
              </div>
            </fieldset>

            <div className="flex gap-3 rounded-2xl bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
              <Camera size={22} className="mt-0.5 shrink-0" />
              <p><strong>Verification photos:</strong> During the visit, our representative may photograph the shop frontage and products only for verification purposes.</p>
            </div>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d8f62] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#087653]">
              Request shop visit <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

const Field = ({ label, icon: Icon, ...props }) => (
  <label>
    <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
    <span className="relative block">
      {Icon && <Icon size={18} className="absolute left-3.5 top-3.5 text-slate-400" />}
      <input {...props} className={`w-full rounded-xl border border-slate-200 py-3 pr-4 text-sm outline-none transition focus:border-[#0d8f62] focus:ring-3 focus:ring-emerald-100 ${Icon ? "pl-10" : "pl-4"}`} />
    </span>
  </label>
);

const SelectField = ({ label, options, ...props }) => (
  <label>
    <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
    <select {...props} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0d8f62] focus:ring-3 focus:ring-emerald-100">
      <option value="">Select an option</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);

export default BookVerification;
