/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import useProducts from '../../../Hooks/useProducts';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WhishListcontext } from '../../context/WishListContext';


export default function RecentProducts() {
    
  let {addProductToCart ,setNumItems,numItems}= useContext(CartContext)
  let {addProductToWL}= useContext(WhishListcontext)
  let {data,isError,isLoading,error}=useProducts()
    const [Loading, setLoading] = useState(false)
    const [currentId, setcurrentId] = useState(0)  
  async function addToCart(id){
    setLoading(true)
    setcurrentId(id)
    let response =await addProductToCart(id)

    if(response.data.status == "success"){
      setNumItems(numItems+1)
      toast.success(response.data.message);
      setLoading(false)
     }
    else{
      toast.error(response.data.message);
      setLoading(false)
    }
   }

  async function addToWL(id){
        setcurrentId(id)
    let response =await addProductToWL(id)    
    if(response.data.status == "success"){
      toast.success(response.data.message);
          }
    else{
      toast.error(response.data.message);
      
    }
   }


    if(isError){
      return <h3>{error}</h3>
    }
    if(isLoading){
      return <div className="spinner"></div>
    }


  return <>
  <div className='row'>
   {data.map((product)=>(
    <div className='md:w-1/4 lg:w-1/6' key={product._id}>
      <div className='product my-2 p-2 relative'>
      <span className='absolute top-6 right-4 cursor-pointer' onClick={()=>addToWL(product.id)} >{currentId == product.id ? <i className="fa-solid fa-heart fa-xl text-red-600"></i>:<i className="fa-regular fa-heart fa-xl"></i>}</span>
      <Link to={`/productdetails/${product.id}/${product.category.name}`}>
        <img src={product.imageCover} loading='lazy' className='w-full' alt={product.description} />
        <h3 className=' text-emerald-700'>{product.category.name}</h3>
        <h3 className='mb-1 font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='flex justify-between p-3'>
          <span>{product.price}EGP</span>
          <span> <i className='fas fa-star text-yellow-400 '></i> {product.ratingsAverage}</span>
        </div>
      </Link>
        <button className='btn' onClick={()=>addToCart(product.id)}> {Loading && currentId == product.id ?<i className="fas fa-spinner fa-spin"></i> : "Add To cart"} </button>              
      </div>
    </div>
  ))}
  </div>
  </>
}
