/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WhishListcontext } from '../../context/WishListContext';


export default function ProductDetails() {
  let {id, category} = useParams()
  const [product, setproduct] = useState(null)
  const [relatedProducts, setrelatedProducts] = useState([])
    let {addProductToCart}= useContext(CartContext)
    const [Loading, setLoading] = useState(false)
    const [currentId, setcurrentId] = useState(0)
      let {addProductToWL}= useContext(WhishListcontext)
    
    
  
         
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
  

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000,
  };   


  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((res)=>{
      setproduct(res.data.data)
      
    }).catch((err)=>{      
    })
  }

  function getAllProduct(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(
      (res)=>{
        let relatedProduct = res.data.data.filter((product)=>product.category.name == category )
        setrelatedProducts(relatedProduct);
        
      }
    )
  }

  async function addToCart(id){
    setLoading(true)
    setcurrentId(id)
    let response =await addProductToCart(id)

    if(response.data.status == "success"){
      toast.success(response.data.message);
      setLoading(false)

    }
    else{
      toast.error(response.data.message);
      setLoading(false)
    }

   }


  useEffect(()=>{
    getProduct(id)
    getAllProduct()
  },[id,category])



return <>
  <div className='row items-center relative'>

    <div className='md:w-1/4 w-full'>
    <Slider {...settings}>

    {/* <img src={product?.images.} className='w-full' alt={product?.description} /> */}
    {product?.images.map((src)=><img key={product.id} loading='lazy' src={src} className='w-full'/>)}
    </Slider>

    </div>
    <div className='md:w-3/4 md:p-4 md:text-left w-full p-4 text-center'>
    <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
    <h4 className='text-gray-700 my-4'>{product?.description}</h4>
    <h4 className='text-gray-700'>{product?.category.name}</h4>
    <div className='flex justify-between p-3 my-5'>
          <span>{product?.price}EGP</span>
          <span onClick={()=>addToWL(product.id)} className='cursor-pointer' >{currentId == product?.id ?<i className="fa-solid fa-heart fa-xl text-red-600"></i> : <i className="fa-regular fa-heart fa-xl"></i>}</span>
          <span> <i className='fas fa-star text-yellow-400 cursor-pointer'></i> {product?.ratingsAverage}</span>
        </div>
        <button className='btn' onClick={()=>addToCart(product.id)}> {Loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add To cart"} </button>              
        </div>
  </div>

  <div className='row'>
  {relatedProducts.length > 0 ?  relatedProducts.map((product)=>(
    <div className='lg:w-1/6 md:w-1/4 w-full' key={product._id}>
      <div className='product my-2 p-2 relative'>
  <span onClick={()=>addToWL(product.id)} className='absolute right-5 top-6 cursor-pointer' >{currentId == product.id ? <i className="fa-solid fa-heart fa-xl text-red-600"></i>:<i className="fa-regular fa-heart fa-xl"/>}</span>
      <Link to={`/productdetails/${product._id}/${product.category.name}`}>
        <img src={product.imageCover} loading='lazy' className='w-full' alt={product.description} />
        <h3 className=' text-emerald-700'>{product.category.name}</h3>
        <h3 className='mb-1 font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='flex justify-between p-3'>
          <span>{product.price}EGP</span>
          <span> <i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
        </div>
      </Link>
      <button className='btn' onClick={()=>addToCart(product.id)}> {Loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add To cart"} </button>              
      </div>
    </div>
  )): <div className="spinner"></div>}
  </div>
  </>
}
