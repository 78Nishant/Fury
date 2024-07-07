import React, { useState } from "react";
import ProductPage from "./ProductPage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function DisplayBox(props) {
  const navigate = useNavigate();
  let product = props.product;
  const price = Math.round(product.price * 83);
  const category = product.category.toUpperCase();
  const productpage = () => {
    navigate('/loading');
    setTimeout(()=>{
    navigate("/productpage", { state: { productinfo: { product } } });
  },3000)
  };
  const tag = product.tags[1] || product.category;
  const ratings = ((price % 10) % 4) + 2;
  const cart = async () => {
    const item = await axios.post("https://ecommercebackend-avcz.onrender.com/mycart", product);
    navigate('/loading')
    setTimeout(()=>{
    navigate("/mycart"); 
    Swal.fire({
      title: "Success",
      text: "Added to cart succesfully",
      icon: "success",
      confirmButtonText: "Check out!",
    });
  },3000)
  };
  const buy = () => {
    navigate('/loading');
    setTimeout(()=>{ 
    navigate("/buyPage", { state: { productInfo: { product } } });
    Swal.fire({
      title: "Success",
      text: "Let's Buy !",
      icon: "success",
      confirmButtonText: "Buy Now!",
    });
    });
   
  };

  return (
    <div className="h-full w-72 md:mx-10  my-2">
      <button
        onClick={productpage}
        className="  bg-gradient-to-br from-red-400 to-blue-500  w-full    border-[#B12704] rounded-3xl drop-shadow-2xl"
      >
        <div className="flex">
          <img
            className="h-48 w-60 mx-3 my-3 "
            src={product.thumbnail}
            alt="Unable to load image"
          />
          <div className="flex justify-end ">
            <div className="bg-white drop-shadow-2xl  hover:scale-105 absolute text-red-600 h-10 w-8 text-2xl rounded-b-md">
              +
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff] h-1/2 rounded-t-[32px] w-full border border-[#ffffff] drop-shadow-lg ">
          <div className="flex justify-start mx-3 my-2 font-sans  font-bold">
            {product.title}
          </div>

          {/* <div className='font-light  my-2 h-10'>{product.description}</div> */}
          <div className="flex">
            <button className="my-1 border border-black w-28  mx-3 rounded-md">
              {tag}
            </button>
            <div className="my-1 border border-black w-28   rounded-md">
              {product.tags[0]}
            </div>
          </div>
          <div className=" mx-3 items-center flex justify-start">
            ⭐ {ratings}.0/ 5
          </div>
          <div className="my-2 text-3xl font-bold flex justify-start mx-3">
            ₹ {price.toLocaleString("en-IN")}
          </div>
        </div>
      </button>
      <div className="flex justify-center  items-center h-16 w-auto bg-yellow-500 drop-shadow-2xl rounded-br-3xl rounded-bl-3xl">
        <button
          onClick={buy}
          className="font-bold mx-3 w-24 bg-red-500 text-white rounded-md h-10 hover:scale-105"
        >
          Buy Now
        </button>
        <button
          onClick={cart}
          className="font-bold  mx-2 w-28 bg-blue-700 text-white rounded-md h-10 hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default DisplayBox;

//comments here
{
  /* <div className='bg-[#B12704] text-white  w-16 h-7'> -{product.discountPercentage}%</div>
    <div className='font-bold text-2xl text-[#B12704] text-center mx-2 my-2'>₹{price}</div>
   
    <div className='text-black font-bold mx-2 '>{product.rating}</div>
    <div className='mx-2 font-bold'>{product.title}</div>
    <div className='text-black my-2  mx-2 flex justify-center'>{category}</div */
}
