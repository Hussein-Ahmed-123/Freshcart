/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Slider from "react-slick";
import useCategories from '../../../Hooks/useCategories';





export default function CategorySlider() {
let { data } = useCategories()

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed:1000,
};


  return <>
  <h2 className='my-3 font-semibold text-gray-500 capitalize text-left'>shop popular categories</h2>
  <Slider {...settings}>
    {data?.map((category)=><div key={category._id}>
      <img src={category.image} className='w-full md:h-[200px]] h-[100px] object-cover' alt={category.name} />
      <h4 className='sm:fa-1.5xs'>{category.name}</h4>
    </div>)}

  </Slider>
  
  </>
}
