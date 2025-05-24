/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import style from "./ForgotPassword.module.css"
import { useFormik } from 'formik'
import *as yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'
export default function ForgotPassword() {

  const [ApiError, setApiError] = useState("")
const [IsLoading, setIsLoading] = useState(false)
const {userLogin,setuserLogin} = useContext(UserContext)
let navigate = useNavigate()


  async function handleLogin(userInfo){

    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,userInfo).then((res)=>{      
      if(res.data.statusMsg=="success"){        
        navigate("/verifycode")
        toast.success(res.data.message)
      }
      setIsLoading(false)
    }).catch((res)=>{
      setApiError(res.data.message)
      setIsLoading(false)
     })
    
    }

      let validationSchema = yup.object().shape({
        email:yup.string().email("Not valid Email").required("Email is required"),
      }) 
  
    let formik =useFormik({
      initialValues: {
        email:"",
      },
      validationSchema,
      onSubmit: handleLogin,
    })



  return <> {ApiError ? <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 '>{ApiError}</div> : null }
  <h2 className='font-bold text-2xl text-center  my-5 text-emerald-700'>please enter your email :</h2>
  < form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

  <div className="relative z-0 w-full  m-5 group">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="userEmail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="userEmail" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  <span className="font-medium"> {formik.errors.email} </span>
</div> :null}
  </div>
  <button type="submit" className="text-white my-5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{IsLoading ? <i className = "fas fa-spinner fa-spin"></i>:"Continue"}</button>

  </form>

  </>
}
  
