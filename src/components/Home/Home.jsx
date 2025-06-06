/* eslint-disable no-unused-vars */
import React from 'react'
import style from "./Home.module.css"
import Products from './../Products/Products';
import Cart from './../Cart/Cart';
import RecentProducts from './../RecentProducts/RecentProducts';
import CategorySlider from './../CategorySlider/CategorySlider';
import MainSlider from './../MainSlider/MainSlider';

export default function Home() {
  return <>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>
  </>
}
