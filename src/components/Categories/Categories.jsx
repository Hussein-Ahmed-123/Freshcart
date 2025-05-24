/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
// import useCategories from './../../../Hooks/useCategories';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useCategories from '../../../Hooks/useCategories';

export default function Categories() {

  const [SubCategories, setSubCategories] = useState([])
  let { data,isError,error,isLoading } = useCategories()
  
  function getAllSubCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`).then((response)=>{
      setSubCategories(response.data.data)
    }).catch((err)=>err)
  }
  useEffect(()=>{
    getAllSubCategories()
  },[])
  if(isError){
    return <h3>{error}</h3>
  }
  if(isLoading){
    return <div className="spinner"></div>
  }

  
  return <>
      <h3  className='text-emerald-700  fa-2xl my-5 p-5'>Categories</h3>

  <div className='row justify-between'>
    {data?.map((category)=>(<div key={category._id}  className='md:w-[32%] w-full border shadow-lg hover:shadow-emerald-300 border-gray-300 rounded-lg mb-4'>
    
   <div className='product'>
   <img src={category.image} alt={category.name} loading='lazy' className='w-full h-[300px] object-fit' />
    <h2 className='text-emerald-700  fa-2xl my-3 p-5'>{category.name}</h2>
   </div>
  </div>


  ))}
</div>




    <h3  className='text-emerald-700 text-left  fa-2xl my-5 p-5'>All SubCategories</h3>
  <div className='row justify-between'>
    {SubCategories?.map((subCategory)=>(<div key={subCategory._id}  className='lg:w-1/3 w-full border shadow-lg hover:shadow-emerald-300 border-gray-300 rounded-lg mb-4'>    
   <div className='product'>
    <h2 className='text-black font-bold capitalize my-2 p-3'>{subCategory.name}</h2>
   </div>
  </div>

  ))}
</div>

  </>
}
