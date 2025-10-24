import React from "react";
import { History, BadgeCheck, Headset } from "lucide-react";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-600">
      <div>
        <div className="w-12 h-12 m-auto mb-5 bg-red-500 text-white rounded-full flex items-center justify-center">
          <History className="w-6 h-6" />
        </div>
        <p className="font-bold">Easy Exchange Policy</p>
        <p>We offer hassle free exchange policy</p>
      </div>
      <div>
        <div className="w-12 h-12 m-auto mb-5 bg-yellow-400 text-white rounded-full flex items-center justify-center">
          <BadgeCheck className="w-6 h-6" />
        </div>
        <p className="font-bold">30 Days Return Policy</p>
        <p>We provide 30 days return policy</p>
      </div>
      <div>
        <div className="w-12 h-12 m-auto mb-5 bg-green-600 text-white rounded-full flex items-center justify-center">
          <Headset className="w-6 h-6" />
        </div>
        <p className="font-bold">Best Customer Support</p>
        <p>We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
