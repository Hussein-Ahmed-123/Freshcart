/* eslint-disable no-unused-vars */
import React from 'react'
import style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import Footer from './../footer/footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return <>
  <Navbar />

  <div className="container w-[95%] my-1 py-15 mx-auto">
    <Outlet />
  </div>

  <Footer/>
  </>
}
