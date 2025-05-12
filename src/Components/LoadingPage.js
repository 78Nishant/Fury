import React, { useState, useEffect } from 'react';
import { Loader2, Coffee, Smile, Zap } from 'lucide-react';

// Loading quotes and tips
const LOADING_CONTENT = [
  {
    icon: <Coffee className="h-16 w-16 text-brown-500 animate-bounce" />,
    tip: "Brewing something awesome...",
    quote: "Good things take time, just like a perfect cup of coffee."
  },
  {
    icon: <Zap className="h-16 w-16 text-yellow-500 animate-pulse" />,
    tip: "Powering up your experience...",
    quote: "Speed is fine, but accuracy is everything."
  },
  {
    icon: <Smile className="h-16 w-16 text-blue-500 animate-spin" />,
    tip: "Preparing your personalized journey...",
    quote: "Patience is not the ability to wait, but the ability to keep a good attitude while waiting."
  }
];

// Cute loading images
const LOADING_IMAGES = [
  'https://t3.ftcdn.net/jpg/00/66/74/90/360_F_66749097_nCsOYh69ix0o7h1DDXztTADd4N3q0Kze.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3aO-MsKu_UfOFz36DtaMyvj_PPYnF4Rj6g&s',
  'https://media.istockphoto.com/id/1404300806/photo/cute-dachshund-puppy-sits-and-looks-attentively-sideways-at-the-owner-waiting-for-a-delicious.webp?b=1&s=170667a&w=0&k=20&c=q5M_2im2chAM4tj-DAHXRKYez_RfL-a5yixXGZddKv0='
];

function LoadingPage() {
  const [loadingContent, setLoadingContent] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Randomly select loading content
    const randomIndex = Math.floor(Math.random() * LOADING_CONTENT.length);
    setLoadingContent(LOADING_CONTENT[randomIndex]);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + Math.floor(Math.random() * 15) + 5;
      });
    }, 500);

    return () => clearInterval(progressInterval);
  }, []);

  // Randomly select an image
  const randomImageIndex = Math.floor(Math.random() * LOADING_IMAGES.length);
  const selectedImage = LOADING_IMAGES[randomImageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Animated Image */}
        <div className="relative">
          <img 
            src={selectedImage} 
            alt="Loading" 
            className="w-full h-64 object-cover transform transition-transform hover:scale-105"
          />
          
          {/* Progress Overlay */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2 bg-blue-200"
            style={{ 
              transform: `scaleX(${Math.min(progress, 100) / 100})`,
              transformOrigin: 'left center'
            }}
          />
        </div>

        {/* Loading Content */}
        <div className="p-6 text-center">
          {loadingContent && (
            <>
              <div className="flex justify-center mb-4">
                {loadingContent.icon}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {loadingContent.tip}
              </h2>
              
              <p className="text-gray-600 italic">
                "{loadingContent.quote}"
              </p>
            </>
          )}

          {/* Loading Spinner */}
          <div className="flex justify-center items-center mt-6">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin mr-3" />
            <span className="text-xl font-semibold text-gray-700">
              Loading... {Math.min(progress, 100)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: `${Math.min(progress, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
    </div>
  );
}

export default LoadingPage;