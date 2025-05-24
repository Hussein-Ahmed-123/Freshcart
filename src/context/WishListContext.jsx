/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext } from "react";


export let WhishListcontext= createContext()

export default function WhishListProvider(props){


    let headers = {
        token: localStorage.getItem("userToken")
    }
    function addProductToWL(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId,},{headers}).then((res)=>res).catch((err)=>err)
    }

    function RemoveProductFromWL(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers}).then((res)=>res).catch((err)=>err)
    }
    function getLoggedUserWL(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers}).then((res)=>res).catch((err)=>err)
    }

    return <WhishListcontext.Provider value={{getLoggedUserWL,RemoveProductFromWL,addProductToWL} }>
        {props.children}
    </WhishListcontext.Provider>

}
