import React, { useState, useEffect } from "react";
import SliderComponent from "../Pages/SliderComponent";
import SecondSection from "../Pages/SecondSection";
import MainBag from "../Bag-Components/MainBag";
import SecondSlider from "../Pages/SecondSlider";
import VideoSlide from "../Pages/VideoSlide";
import BagSlider from "../Pages/BagSlider";
import FooterSlider from "../Footer-Section/FooterSlider";
import PremiumBagLoader from "../Loader Component/FullScreenLoader";
import Trending from "../Pages/Trending";
import Iconic from "../Pages/Iconic";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if initial load has already been completed
    const initialLoadComplete = localStorage.getItem("initialLoadComplete");

    if (initialLoadComplete === "true") {
      setIsLoading(false);
    }
    // If not set, loader will show and then set the flag
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <PremiumBagLoader onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div data-aos="fade-up" data-aos-duration="900">
      <SliderComponent />
      <SecondSection />
      <MainBag />
     <Trending/>
      <SecondSlider />
      <Iconic/> 
      <VideoSlide />
      <BagSlider /> 
      <FooterSlider />
    </div>
  );
}

export default HomePage;
