import React, { useState } from "react";
// https://whatonsaletoday.com/wp-content/uploads/2022/03/edenrobe-sumer-sale.jpg
//https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-facebook-cover-design-template-2e10214ed16ca2db95e8f354bb33aa92_screen.jpg?ts=1634573105
//https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sale-retail-fashion-facebook-cover-poster-template-5bce86e30a2915098371acc57084d6b5_screen.jpg?ts=1561427964

function FrontBanner(props) {
  const imagesArray = [
    "https://img.freepik.com/premium-vector/flat-design-realistic-banner-template_23-2150102691.jpg?w=2000",
    "https://img.freepik.com/free-vector/horizontal-banner-template-black-friday-sales_23-2150867247.jpg?w=2000&t=st=1720333285~exp=1720333885~hmac=84e7187648f931e0949af3fdf95819047413c7bd15f31416c1b7a5be05261ef7",
    "https://img.freepik.com/free-vector/fashion-store-banner-template_1361-1248.jpg?t=st=1720340167~exp=1720343767~hmac=a3350b91aeaffae826abfb7934cbb1c175c1739b871e69e5f95bf1226ca032c0&w=2000",
    "https://img.freepik.com/premium-vector/promotion-fashion-banner_190089-61.jpg?w=2000",
    "https://img.freepik.com/premium-psd/copyspace-mockup-spring-sale-with-attractive-woman_23-2148136312.jpg?w=2000",
    "https://img.freepik.com/premium-vector/web-banner-tablets-presentation-devices-from-different-angles-advertisement-banner-template-vector-illustration_541075-598.jpg?w=2000",
    "https://img.freepik.com/premium-vector/two-smartphones-14-diagonal-angle-editable-mockup-black-template_541075-1615.jpg?w=2000",
    
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [image, setImage] = useState(imagesArray[0]);
  setTimeout(() => {
    setCurrentImage((currentImage + 1) % imagesArray.length);
    setImage(imagesArray[currentImage]);
  }, 5000);

  return (
    <div className="h-full mt-2  flex justify-center text-white ">
      {/* <div className='absolute top-1/4'> Banner Here! </div> */}
      <img className=" w-11/12 drop-shadow-2xl "  src={image} />
      
    </div>
  );
}

export default FrontBanner;
