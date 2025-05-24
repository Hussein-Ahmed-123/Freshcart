/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  let {getLogedUserCart,updateCartProductQuantity, deleteCartItem,deleteCartItems, numItems,setNumItems} =useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [currentId, setcurrentId] = useState(0)
  
  async function getCartItem(){
    let response = await getLogedUserCart()    
    if (response?.data?.status == "success") {
      setCartDetails(response.data.data)
    }
  }
  
  async function updateProduct(id , count){
    if (count == 0) {
      deleteItem(id)
    }else{
      let response = await updateCartProductQuantity(id,count)
      
      if (response?.data?.status == "success") {
        setCartDetails(response.data.data)
        toast.success("product is updated successfully")
      }else{
        toast.error("error")
      }
    }
    
  }
  
  async function deleteItem(productId){
    setLoading(true)
    setcurrentId(productId)
    let response = await deleteCartItem(productId)
    if (response.data?.status == "success") {
      setNumItems(numItems-1)
      setCartDetails(response.data.data)
      setLoading(false)
    }
  }
  
  async function deleteItems(){
    setLoading(true)
    let response = await deleteCartItems()
    console.log(response.data.message);
    if (response.data.message == "success") {
      setCartDetails(response.data.data)
      setNumItems(0)
      toast.success("Clear successfully")
      setLoading(false)
    }else{
      toast.error("error")
      setLoading(false)
      
    }
    
  }

  useEffect(()=>{
    getCartItem()
    updateProduct()
    deleteItem()    
  },[])
  return <>
  {CartDetails?.products.length > 0 ?   <>
  <h2 className='text-2xl text-emerald-600 capitalize font-bold my-4'>total price : {CartDetails?.totalCartPrice}</h2>
<div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-white">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 text-center py-3 sm:p-1 ">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
        {CartDetails?.products.map((product)=><tr key={product?.product?.id} className="bg-emerald-700 border-b border-salute-700 dark:bg-salute-800 hover:bg-salute">
        <td className="p-4 ">
          <img src={product.product.imageCover} loading='lazy' className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-white salute:text-white">
        {product.product.title}
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProduct(product?.product?.id,product?.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-emerald-500 bg-white border border-emerald-300 rounded-full focus:outline-none hover:bg-emerald-100   salute:bg-emerald-800 salute:text-emerald-400 salute:border-emerald-600 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{product.count}</span>
            </div>
            <button onClick={()=>updateProduct(product?.product?.id,product?.count+1)}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium  text-emerald-500 bg-white border border-emerald-300 rounded-full focus:outline-none hover:bg-emerald-100   salute:bg-emerald-800 salute:text-emerald-400 salute:border-emerald-600  " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-white ">
          {product.price * product.count}
        </td>
        <td className="px-6 py-4">
        <button className='btn-red ' onClick={()=>deleteItem(product.product.id)}>
        {Loading && currentId == product.product.id ? <i className="fas fa-spinner fa-spin"></i> :"remove"}
          </button>            
        </td>
      </tr>)}
      
    </tbody>
  </table>
</div> 



<Link to={"/checkout"} >
<button className="text-white m-3 w-full md:w-2/4 lg:w-2/4 ms-0  bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 ">
    Checkout
  </button>
    </Link>
<button onClick={()=>deleteItems()} className="text-white m-3 ms-0 md:w-2/4 lg:w-1/4  w-full  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm    py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 ">
    <i className="fa-solid fa-trash"></i> Clear Mycart 
  </button>




  

 </> : <h1 className='text-3xl text-emerald-700 font-bold my-5'>{CartDetails === null ? <div className="spinner"></div> : "there is not items to show"}</h1>}

  </>
}
