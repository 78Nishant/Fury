import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function DisplayBox(props) {
  const navigate = useNavigate();
  let product = props.product;

  const price = Math.round(product.price * 83);

  const productpage = () => {
    navigate('/loading');
    setTimeout(()=>{
    navigate("/productpage", { state: { productinfo: { product } } });
  },3000)
  };
 
 
 
  const tag = product.tags[1] || product.category;
  const ratings = ((price % 10) % 4) + 2;
  const cart = async () => {
    const id=localStorage.getItem('auth-id');
    const idInfo={
      "authID":id
    }
    const userdata=await axios.post('https://furybackend.onrender.com/activeUser',idInfo);
    if(userdata.data===null){
      navigate('/loginpage')
      Swal.fire("Login First")
    }
    else{
     await axios.post(`https://furybackend.onrender.com/usercart/${userdata.data.email}`,product);
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
}
  };

  const buy = async()=>{
    const id=localStorage.getItem('auth-id');
    const idInfo={
      "authID":id
    }
    const info=await axios.post('https://furybackend.onrender.com/activeUser',idInfo);
      if(info.data==null){
        navigate('/loginpage')
        Swal.fire("Login First")
      }
      else{
        Swal.fire({
          title: "Success",
          text: "Let's Buy !",
          icon: "success",
          confirmButtonText: "Buy Now!",
        });
        navigate("/buyPage", { state: { productInfo: { product } } });
      }
  };

  return (
    <div className="border h-full w-full rounded-md ">
      <button className='w-full justify-center flex mt-4' onClick={productpage}>
      <img className="h-1/2 scale-110  bg-[#e2e5e8] rounded-md w-4/5 justify-center" src={product.thumbnail} />
      </button>
      <div className="mt-3">
        
        <p className="w-full text-left font-bold xl:ml-4 sm:ml-2 ">{product.title}</p>
        
        <p className="w-full text-left ml-4 mt-3">₹{price.toLocaleString("en-IN")}</p>
        <div className="flex justify-left ml-5 mt-3">
          <p className="border  w-2/5 h-auto rounded-md">{product.tags[0]}</p>
          <p className="border w-2/5  ml-3 h-auto rounded-md">{tag}</p>
        </div>
        <div className="mt-3 mb-3  flex justify-center ">
          <button onClick={buy} className="bg-red-500 rounded-md text-white w-1/2 h-10">Check Out</button>
          <button onClick={cart} className="bg-blue-500 ml-5 w-1/4 flex justify-center items-center rounded-md">
          <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/ffffff/add-shopping-cart.png" alt="add-shopping-cart"/>
          </button>
        </div>
      </div>

    </div>
  );
}

export default DisplayBox;


