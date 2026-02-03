import React, { useState, useEffect } from "react";
import SliderComponent from "../Pages/SliderComponent";
import SecondSection from "../Pages/SecondSection";
import SecondSlider from "../Pages/SecondSlider";
import VideoSlide from "../Pages/VideoSlide";
import BagSlider from "../Pages/BagSlider";
import FooterSlider from "../Footer-Section/FooterSlider";

import Trending from "../Pages/Trending";
import Iconic from "../Pages/Iconic";
import SmallBagComponent from "../Bag-Components/SmallBagComponent";

function HomePage() {


  return (
    <div data-aos="fade-up" data-aos-duration="900">
      <SliderComponent />
      <SecondSection />
      <SmallBagComponent/>
     <Trending/>
      <SecondSlider />
      <Iconic/> 
      {/* <VideoSlide />  */}
       <BagSlider /> 
      <FooterSlider />
    </div>
  );
}

export default HomePage;
