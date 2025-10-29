import React from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router';
import { Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-500">
      {/* Hero left side */}

      <div className="w-full sm:w-1/2 flex items-center  justify-center py-10 sm:py-0 ">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <div className="relative flex">
              <Star className="text-red-600" />
              <Star className="text-yellow-300" />
              <Star className="text-green-500" />
            </div>
            <p className="font-medium text-sm md:text-base">BESTSELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed ">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <Link to="/collections" className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base bg-green-200 rounded-2xl border p-2">
                {" "}
                SHOP NOW
              </p>
            </Link>
          </div>
        </div>
      </div>
      {/* Hero right side */}
      <img className="w-full sm:w-1/2" src={assets.Hero} alt="Hero image " />
    </div>
  );
}

export default Hero
