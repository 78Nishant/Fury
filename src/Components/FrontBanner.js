import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const FrontBanner = (props) => {
  const imagesArray = [
    "https://img.freepik.com/premium-vector/flat-design-realistic-banner-template_23-2150102691.jpg?w=2000",
    "https://img.freepik.com/free-vector/horizontal-banner-template-black-friday-sales_23-2150867247.jpg?w=2000",
    "https://img.freepik.com/free-vector/fashion-store-banner-template_1361-1248.jpg?w=2000",
    "https://img.freepik.com/premium-vector/promotion-fashion-banner_190089-61.jpg?w=2000",
    "https://img.freepik.com/premium-psd/copyspace-mockup-spring-sale-with-attractive-woman_23-2148136312.jpg?w=2000",
    "https://img.freepik.com/premium-vector/web-banner-tablets-presentation-devices-from-different-angles-advertisement-banner-template-vector-illustration_541075-598.jpg?w=2000",
    "https://img.freepik.com/premium-vector/two-smartphones-14-diagonal-angle-editable-mockup-black-template_541075-1615.jpg?w=2000",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to navigate to next slide
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesArray.length);
      setIsTransitioning(false);
    }, 300);
  }, [imagesArray.length]);

  // Function to navigate to previous slide
  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? imagesArray.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  }, [imagesArray.length]);

  // Function to go to a specific slide
  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  // Set up the timer for auto-advancement
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, nextSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === " ") {
        toggleAutoplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative h-full w-full mt-10 flex justify-center ">
      <div className="w-11/12 relative overflow-hidden rounded-lg shadow-xl">
        {/* Main Image with transition effect */}
        <div className="relative h-64 md:h-96 bg-gray-200 overflow-hidden">
          <img 
            className={`absolute w-full h-full object-cover transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`} 
            src={imagesArray[currentIndex]} 
            alt={`Banner ${currentIndex + 1}`}
          />
          
          {/* Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button 
              onClick={prevSlide}
              className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Play/Pause Button */}
          <button 
            onClick={toggleAutoplay}
            className="absolute bottom-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        
        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {imagesArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontBanner;