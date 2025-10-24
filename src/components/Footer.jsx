import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="h-16 w-auto" />
          <p className="w-full md:2/3 text-gray-600 ">
            <span className='font-bold'>Ghana Market Place </span>is a celebration of Ghanaian
            heritage. We are a community dedicated to connecting talented local
            artisans directly with you. Discover authentic, handmade crafts and
            support the makers who keep our traditions alive.
          </p>
        </div>

        <div>
          <p className="font-medium mb-5 ">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+233 24* 9*3 **4</li>
            <li>contact@ghanamarketplace.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className=" py-5 text-sm text-center">
          Copyright 2025@ ghanamarketplace.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer
