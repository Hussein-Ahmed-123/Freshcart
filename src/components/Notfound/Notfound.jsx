/* eslint-disable no-unused-vars */
import React from 'react'
import style from "./Notfound.module.css"
import logo  from '../../assets/error.svg'
export default function Notfound() {
  return <>
  <div className="flex justify-center align-middle">
  <img src={logo} alt="error not found" />
  </div>
  </>
}
