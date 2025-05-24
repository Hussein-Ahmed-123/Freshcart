/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import  axios  from 'axios';

export let CartContext = createContext()

export default function CartContextProvider(props){

    let headers = { token: localStorage.getItem("userToken") }
    const [CartId, setCartId] = useState(0)
    const [numItems, setNumItems] = useState(0)
    function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId,
        },{
            headers,
        }
    )
    }

     function getLogedUserCart(){
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then((res)=>{
        // console.log(res.data.numOfCartItems);
        setNumItems(res.data.numOfCartItems)
        setCartId(res.data.data._id)
        return res
        
    }).catch((err)=>err)
    }
     function updateCartProductQuantity(productId,newCount){
        return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count : newCount},{headers }).then((res)=>res).catch((err)=>err)}
     
        function deleteCartItem(productId){
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers }).then((res)=>res).catch((err)=>err)
    }
    
    function deleteCartItems(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((res)=>res).catch((err)=>err)
    }


    function Checkout(cartId,url,formData){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:formData
        },{headers,}).then((res)=>res).catch((err)=>err)
    }


        useEffect(()=>{
            getLogedUserCart()
        },[])
    return <CartContext.Provider value={{addProductToCart,getLogedUserCart ,updateCartProductQuantity,deleteCartItem,deleteCartItems,Checkout,CartId,setNumItems,numItems }}>
        {props.children}
    </CartContext.Provider>
}