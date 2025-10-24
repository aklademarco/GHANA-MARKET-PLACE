import React from 'react'

const NewsLetter = () => {
  return (
    <div className=" text-center">
      <p className="text-2xl font-medium text-gray-600">
        Subcribe now and get 20% off{" "}
      </p>
      <p className="text-gray-600">
        Join our artisan community! Be the first to discover new collections,
        hear the stories behind our talented makers, and receive exclusive
        offers. Subscribe now and enjoy 20% off your first order as our welcome
        gift.
      </p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input
          type="email"
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 "
        >
          Subcribe
        </button>
      </form>
    </div>
  );
}

export default NewsLetter
