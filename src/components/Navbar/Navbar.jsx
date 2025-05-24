/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import logo from "../../../public/freshcart-logo.svg"
import { Link , useNavigate } from 'react-router-dom'
import { UserContext } from './../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  const {userLogin,setuserLogin}= useContext(UserContext)
  const {numItems,setNumItems}= useContext(CartContext)
  let navigate = useNavigate()
   function Signout(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")
   }
  return <>
  

<nav className="bg-slate-300 fixed top-0 right-0 left-0 border-gray-200 nav p-x3 ">
    <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
      <div className='flex items-center gap-1'>
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width={"125px"} className="h-8" alt="Flowbite Logo" />
        </Link>

        {userLogin != null ? <><ul className='flex gap-3'>
          <li><Link className='text-slate-600' to="">Home</Link></li>
          <li><Link className='text-slate-600 relative' to="cart">Cart
          {numItems!=0?          <div className='absolute top-[-10px] right-[-10px] size-4 bg-emerald-600 rounded-full text-white flex justify-center items-center'>{numItems}</div>
: null}
          </Link></li>
          <li><Link className='text-slate-600' to="products">Products</Link></li>
          <li><Link className='text-slate-600' to="categories">Categories</Link></li>
          <li><Link className='text-slate-600' to="brands">Brands</Link></li>
          <li><Link className='text-slate-600' to="wishlist">WishList</Link></li>
        </ul>
        </> : null}
        
      </div>


        
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
        <ul className='flex gap-4'>
        <li><i className="fab fa-facebook"></i></li>
        <li><i className="fab fa-youtube"></i></li>
        <li><i className="fab fa-instagram"></i></li>
        <li><i className="fab fa-linkedin"></i></li>
        <li><i className="fab fa-twitter"></i></li>
        </ul>
        {userLogin != null ? <span onClick={Signout} className='cursor-pointer'>Signout</span> :  <>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link> </> }
        </div>
    </div>
</nav>


  </>
}
