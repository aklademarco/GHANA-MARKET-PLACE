import { Star } from 'lucide-react'
import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {text1} <span className="text-gray-700 font-medium">{text2}</span>{" "}
      </p>
      <div className='relative flex'>
        <Star className='text-red-600'/>
        <Star className='text-yellow-300' />
        <Star className='text-green-500' />
      </div>
    </div>
  );
}

export default Title
