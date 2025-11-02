import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    toast.success("Thank you! Your message has been sent successfully.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="text-sm text-gray-600 mt-3 max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help! Reach out to
          us and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Information & Form */}
      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        {/* Left Side - Contact Information */}
        <div className="flex flex-col gap-8 md:w-1/2">
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="text-black" size={24} />
              Get In Touch
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Whether you have questions about our products, need help with an
              order, or want to learn more about our artisans, we'd love to hear
              from you. Our team is dedicated to providing exceptional customer
              service.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Mail className="text-black" size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email Us</h4>
                <p className="text-gray-600">support@ghanamarketplace.com</p>
                <p className="text-gray-600">info@ghanamarketplace.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Phone className="text-black" size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Call Us</h4>
                <p className="text-gray-600">+233 24 123 4567</p>
                <p className="text-gray-600">+233 50 987 6543</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <MapPin className="text-black" size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Visit Us</h4>
                <p className="text-gray-600">123 Kwame Nkrumah Avenue</p>
                <p className="text-gray-600">Accra, Ghana</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Clock className="text-black" size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Business Hours</h4>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <img
            src={assets.Hero}
            alt="Ghana Marketplace"
            className="w-full max-w-md rounded-lg shadow-md mt-6"
          />
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2">
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition font-medium flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Quick Links */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold mb-3 text-blue-900">
              Need Quick Answers?
            </h4>
            <p className="text-sm text-blue-800 mb-3">
              Check out our frequently asked questions or policies:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Shipping & Delivery Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Return & Exchange Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Payment Methods
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Product Care Instructions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
