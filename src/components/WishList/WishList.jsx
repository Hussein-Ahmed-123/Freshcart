/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { useContext } from 'react'
import { WhishListcontext } from '../../context/WishListContext'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
export default function WishList() {
  let{getLoggedUserWL,RemoveProductFromWL} = useContext(WhishListcontext)
  let{addProductToCart,setNumItems,numItems} = useContext(CartContext)
  const [Loading, setLoading] = useState(false)
    const [currentId, setcurrentId] = useState(0)
    const [prdctId, setprdctId] = useState(0)
  const [WLDetails, setWLDetails] = useState([])
  async function getWLItem(){
    let response = await getLoggedUserWL()
        
    if (response.data.status == "success") {
      setWLDetails(response?.data?.data)
      toast("welcome to your wishList")
    }
  }

  async function addToCart(id){
    let response =await addProductToCart(id)
    setLoading(true)
    setprdctId(id)
    if(response.data.status == "success"){
      setNumItems(numItems+1)
      deleteItem(id)
      setLoading(false)
      toast.success(response.data.message);
     }
    else{
      setLoading(false)
      toast.error(response.data.message);
    }
   }

  async function deleteItem(productId){
    setLoading(true)
    setcurrentId(productId)
    let response = await RemoveProductFromWL(productId)
    
    if (response.data?.status == "success") {
      setWLDetails(response.data.data)
      setLoading(false)
      toast.success(response.data.message);
  }
}
  
  useEffect(()=>{
    getWLItem()
    deleteItem()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <>
  <h2  className='text-emerald-700 font-bold fa-2xl my-5 p-3'>My WishList</h2>
  <div className='row  my-5 px-4  '>
  {WLDetails?.map((product)=>(<div key={product._id}   className=' md:w-1/3 w-full  content-end  border shadow-lg hover:shadow-emerald-300 border-gray-300 rounded-lg mb-4'>    
   <div className='product flex align-middle justify-center flex-wrap '>
   <img src={product.imageCover} alt={product.description} loading='lazy' className='w-full h-[250px] object-fill' />
    
    <h2 className=' capitalize my-1 p-1  font-bold w-full'>{product.title}</h2>
    <h2 className='  my-2 p-2 text-emerald-600 capitalize font-bold'>{product.price}EGP</h2>
    
   </div>
    <div className='flex align-center flex-wrap m-1'>
    <button className='btn-red ' onClick={()=>deleteItem(product.id)}>
    {Loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> :"remove"}
    </button> 
    <button className='btn' onClick={()=>addToCart(product.id)}> {Loading && prdctId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add To cart"} </button>              
      </div>  
  </div>))}
  </div>
  </>
  
  
}
