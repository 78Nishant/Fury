import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.state.search;
  const [product, setProduct] = useState();
  const [productArray, setProductArray] = useState([]);
  const getProduct = async () => {
    const product = await axios.get(`https://ecommercebackend-avcz.onrender.com/search/${search}`);
    setProductArray(product.data);
  };
  useEffect(() => {
    getProduct();
  });
  const cart = async () => {
    const item = await axios.post("https://ecommercebackend-avcz.onrender.com/mycart", product);
    Swal.fire({
      title: "Success",
      text: "Added to cart succesfully",
      icon: "success",
      confirmButtonText: "Check out!",
    });
    navigate("/mycart");
  };
  const productpage = (params) => {
    const product=params
    navigate("/productpage", { state: { productinfo:  {product} } });
  };
  if(productArray.length===0 ){
    return(
      <div className="text-5xl text-black h-screen flex items-center w-screen justify-center ">
          <div>
            <img src="https://t3.ftcdn.net/jpg/00/66/74/90/360_F_66749097_nCsOYh69ix0o7h1DDXztTADd4N3q0Kze.jpg" />
          Sorry ! No results found 
          </div>
      </div>
    )
  }

  return (
    <div className="w-screen my-20 mx-60 ">
      <div className="mx-20 text-3xl flex">
        Showing results for : <div className="font-bold mx-2"> {search}</div>{" "}
      </div>
      {productArray.map((item) => {
        return (
          <button onClick={()=>productpage(item)} className="h-1/4 flex w-1/2 bg-gradient-to-r from-red-500  to-blue-600 text-white mx-20 my-5 rounded-md drop-shadow-2xl z-1">
            <div className=" my-2">
              <img className="h-44" src={item.thumbnail} />
            </div>
            <div className="mx-10">
              <div className="font-bold mx-2 my-2 text-2xl w-full flex justify-start">{item.title}</div>
              <div className="mx-2 text-yellow-400  w-full flex justify-start">{item.rating} / 5</div>
              <div className="font-bold mx-2 mt-3  w-full flex justify-start">
                ₹{Math.floor(item.price * 83).toLocaleString("en-IN")}
              </div>
              <div className="bg-yellow-600 text-white w-20 text-center my-2 mx-2 ">
                -{item.discountPercentage}%
              </div>
              <div className="flex justify-start">
              <button className="bg-white h-7 my-5 text-blue-600 w-24 rounded-md drop-shadow-2xl my-4">
                Buy now
              </button>
              <button
                onClick={cart}
                className="bg-white text-red-600 w-32 mx-3 rounded-md h-7 my-5"
              >
                Add to cart
              </button>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}


export default SearchPage;
