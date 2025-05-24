/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import *as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [ApiError, setApiError] = useState("")
  const [IsLoading, setIsLoading] = useState(false)
  const {userLogin,setuserLogin} = useContext(UserContext)
  let navigate = useNavigate()

  
  async function handleLogin(userInfo){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userInfo).then((res)=>{
      if(res.data.message=="success"){        
        localStorage.setItem("userToken", res.data.token)
        navigate("/")
        setuserLogin( res.data.token)
        toast.success("welcome "+ res.data.user.name)
      }
      setIsLoading(false)
    }).catch((res)=>{
      setApiError(res.response.data.message)
      setIsLoading(false)
    })
  }

    let validationSchema = yup.object().shape({
      email:yup.string().email("Not valid Email").required("Email is required"),
      password:yup.string().required("Password is required").min(6,"Password minimum length is 6"),
    }) 

  let formik =useFormik({
    initialValues: {
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit: handleLogin,
  })
 
 return <> {ApiError ? <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 '>{ApiError}</div> : null }
  <h2 className='font-bold text-2xl text-center my-5 text-emerald-700'>Login Now</h2>
  < form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

  <div className="relative z-0 w-full  mb-5 group">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="userEmail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="userEmail" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  <span className="font-medium"> {formik.errors.email} </span>
</div> :null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="userPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="userPassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium"> {formik.errors.password} </span>
</div> :null}
  </div>
  <Link to={"/forgot-password"}>  <span className='text-blue-500 underline text-left block text-xs'>Forget Your Password ?  </span></Link>
  <div className='flex gap-4 p-5 items-center'>
  <button type="submit" className="text-white my-5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">{IsLoading ? <i className = "fas fa-spinner fa-spin"></i>:"Login"}</button>
  <Link to={"/register"}>  <span className='text-blue-500 underline text-xs'>Don't you have an Account ? Register now </span></Link>
  </div>
  </form>
  </>
}
