import React, { useContext } from 'react'
import { shopContext } from '../context/shopContext'
import Title from './Title';

const LatestCollection = () => {
    const { products } = useContext(shopContext);
    console.log(products)
  return (
    <div className='my-10 '>
      <div className='text-center py-8 text-3xl'>
      <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
      </div>
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'></p>
      
    </div>
  )
}

export default LatestCollection
