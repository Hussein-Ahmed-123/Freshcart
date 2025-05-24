/* eslint-disable no-unused-vars */
import React from 'react'
import style from "./MainSlider.module.css"
import slider1 from '../../assets/slider1.jpeg'
import slider2 from '../../assets/slider2.jpeg'
import slider3 from '../../assets/slider3.jpeg'
import slider4 from '../../assets/slider4.jpeg'
import slider5 from '../../assets/slider5.jpeg'
import Slider from "react-slick";



export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000,
  };


  return <>
  <div className="row my-5">
    <div className="w-3/4">
  <Slider {...settings}>
    <img src={slider1} className='w-full md:h[50px] md:object-cover  h-[400px] object-cover' alt="vegetables" />
    <img src={slider4} className='w-full md:h[50px] md:object-cover  h-[400px] object-cover' alt="salad" />
    <img src={slider5} className='w-full md:h[50px] md:object-cover h-[400px] object-cover' alt="bakery" />
  </Slider>
    </div>
    <div className="w-1/4">
    <img src={slider2} className='w-full md:h[25px] md:object-cover  h-[200px] ' alt="red valcet" />
    <img src={slider3} className='w-full md:h[25px] md:object-cover  h-[200px] ' alt="cokoladni kolutic" />
    </div>
  </div>
  </>
}
