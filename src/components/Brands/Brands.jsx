/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import useBrands from '../../../Hooks/useBrands'




export default function Brands() {
  let {data,error,isError ,isLoading} = useBrands()
  
  if(isError){
    return <h3>{error}</h3>
  }
  if(isLoading){
    return <div className="spinner"></div>
  }
  return <>
  
  <h2  className='text-emerald-700 font-bold fa-2xl my-5 p-3'>All Brands</h2>
  <div className='row justify-center my-5 px-4'>
    {data?.map((brand)=>(<div key={brand._id}  className='lg:w-[24%] md:w-1/3 md:m-1 w-full border shadow-lg hover:shadow-emerald-300 border-gray-300 rounded-lg mb-4'>    
   <div className='product'>
   <img src={brand.image} alt={brand.name} loading='lazy' className='w-full h-[200px] object-fit' />
    <h2 className='text-black  capitalize my-3 p-5'>{brand.name}</h2>
   </div>
  </div>
  ))}
</div>
  
  
  </>
}
