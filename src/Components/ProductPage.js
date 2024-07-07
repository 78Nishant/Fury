import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function ProductPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.productinfo.product;
  const price = Math.round(product.price * 83);
  const reviews = product.reviews;
  const image = product.images;
  const [num, setNum] = useState(0);
  const [im, setIm] = useState(image[0]);
  const tag = product.tags[1] || product.category;
  const secondTag=product.tags[0] || product.category;
  const feedback = () => {
    alert("Thanks for feedback !");
  };
  const size = image.length;
  const next = () => {
    setNum((num + 1) % size);
    setIm(image[`${num}`]);
  };
  const prev = () => {
    setNum(Math.abs((num - 1) % size));
    setIm(image[`${num}`]);
  };
  const cart =async () => {
    const item=await axios.post('https://ecommercebackend-avcz.onrender.com/mycart',product)
    Swal.fire({
      title: "Success",
      text: "Added to cart succesfully",
      icon: "success",
      confirmButtonText: "Check out!",
    });
    navigate("/mycart");
  };
  const buy = () => {
    Swal.fire({
      title: "Error!",
      text: "In Development",
      icon: "error",
      confirmButtonText: "Check out product! ",
    });
  };
  const arrow = ">";
  const prev_arrow = "<";
  const [formdata, setFormData] = useState({});
  const change = (e) => {
    const { name, value } = e.target;
    setFormData((formdata) => ({ ...formdata, [name]: value }));
  };
  const submit = (e) => {
    e.preventDefault();
    sendData(formdata);
    console.log(formdata);
  setFormData({});
    //notify
    Swal.fire({
      title: "Success",
      text: "Thanks for your Feedback!",
      icon: "success",
      // confirmButtonText: "Check out!",
    });
  };
  const sendData = async (formdata) => {
    
    const send = await axios.post(
      `https://ecommercebackend-avcz.onrender.com/${product.title}`,
      formdata
    );
  };
  const [vis, setVis] = useState("invisible h-0");
  const click = () => {
    setVis("visible h-auto");
  };
  const search = (param) => {
    
    const searchTag=param.tag || param.secondTag;
    console.log(searchTag);
    navigate("/search", { state: { search: searchTag} });
  };

  return (
    <div>
      <div className="mx-5 my-2  ">
        <a className="text-blue-800 underline" href="/">
          Home
        </a>{" "}
        {arrow} {product.category} {arrow} {product.title}
      </div>
      <div className="h-5/6 flex">
        <div className="h-1/3 w-6/12  mx-2">
          <div className="flex ">
            <button onClick={prev}>{prev_arrow}</button>
            <img
              className=" mx-3 my-10 hover:z-50"
              src={im}
              alt="Unable to load image"
            />
            <button onClick={next}>{arrow}</button>
          </div>
          <div className="text-center">
            Image {Math.abs((num - 1) % size) + 1} out of {size}
          </div>
        </div>
        <div className="  mx-20 my-10 ">
          <div className="border-b-2">
            <div className="text-7xl font-sans w-5/6">{product.title}</div>
            <div className="flex my-3">
              <button
                onClick={() => search({secondTag})}
                className="border border-black w-52 text-center rounded-md"
              >
                {secondTag}
              </button>
              <button
                onClick={() => search({ tag })}
                className="border border-black w-52 text-center mx-3 rounded-md"
              >
                {tag}
              </button>
            </div>
            <div className="text-2xl font-light my-3">
              {product.description}
            </div>
          </div>
          <div className="text-5xl font-bold  my-3 text-red-600">
            ₹{price.toLocaleString("en-IN")}
          </div>
          <div className="text-blue-900">-{product.discountPercentage}%</div>
          <button
            onClick={buy}
            className="font-bold my-10 w-24 bg-gradient-to-br from-red-500 to-blue-700 text-white rounded-md h-10 hover:scale-105"
          >
            Buy Now
          </button>
          <button
            onClick={cart}
            className="font-bold my-10 mx-5 w-28 bg-gradient-to-br from-blue-700 to-red-500 text-white rounded-md h-10 hover:scale-105"
          >
            Add to Cart
          </button>

          <div className="flex  border-t-2 border-b-2 h-24 items-center w-5/6 text-blue-900">
            <div className="w-20"> 
            <img className="flex justify-center w-8 h-8 mx-3" src="https://img.icons8.com/ios-glyphs/136BCB/security-checked.png" alt="security-checked"/>
              {product.warrantyInformation}
              </div>
            <div className="ml-8 w-32">
            <img className="flex justify-center w-8 h-8 mx-3" src="https://img.icons8.com/ios-glyphs/136BCB/delivery--v1.png" alt="security-checked"/>
              {product.shippingInformation}</div>
            <div className="mx-2 w-32">
            <img className="flex justify-center w-8 h-8 mx-3" src="https://img.icons8.com/ios-glyphs/136BCB/replay.png" alt="security-checked"/>
              {product.returnPolicy}</div>
            <div className="mx-1 w-32">
            <img className="flex justify-center w-8 h-8 mx-3" src="https://img.icons8.com/ios-glyphs/136BCB/trademark.png" alt="security-checked"/>
              Top brand</div>
            <div className="w-32">
            <img className="flex justify-center w-8 h-8 mx-3" src="https://img.icons8.com/ios-glyphs/136BCB/money--v1.png" alt="security-checked"/>
              Cash on Delivery</div>
          </div>
          <div className="font-bold my-5">{product.availabilityStatus}</div>
        </div>
      </div>
      <div className="mx-3 font-bold text-2xl">Customer Reviews:-</div>
     
     {/* Review section */}
      <div>
        {reviews.map((e) => {
          return (
            <div className="my-3 mx-10 text-1xl h-32 border-b-2 ">
              <div className=" flex">
                <img
                  className="h-7 my-1"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                />
                <div className="my-1 font-bold mx-1">{e.reviewerName} </div>
              </div>
              <div>⭐{e.rating} / 5</div>
              <div>{e.comment}</div>
              <div className="flex my-1">
                <button
                  onClick={feedback}
                  className="border w-20 rounded-md hover:bg-blue-800 hover:text-white bg-[#ffffff]"
                >
                  Helpful
                </button>
                <button
                  onClick={feedback}
                  className="border w-20 mx-3 hover:bg-red-600 hover:text-white rounded-md bg-[#ffffff]"
                >
                  Report
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={click}
        className="text-center w-screen border hover:bg-gradient-to-r from-red-600 to-blue-800 hover:text-white"
      >
        Add a review
      </button>
      <div className={vis}>
        <form className="h-auto bg-gradient-to-r from-red-600 to-black text-white flex">
          <div className="flex mx-10 h-10 my-2">
            <div>rating</div>
            <input
              className="w-52 mx-3 text-black rounded-md"
              name="rating"
              onChange={change}
              placeholder="Enter rating here"
            />
          </div>
          <div className="flex mx-10 my-2 h-10">
            <div>comment</div>
            <input
              className="w-52 mx-3 text-black rounded-md"
              name="comment"
              onChange={change}
              placeholder="Enter rating here"
            />
          </div>
          <div className="flex mx-10 my-2 h-10">
            <div>name</div>
            <input
              className="w-52 mx-3 text-black rounded-md"
              name="reviewerName"
              onChange={change}
              placeholder="Enter rating here"
            />
          </div>
          <div className="flex mx-3 my-2 h-10 ">
            <div>email-id</div>
            <input
              className="w-52 mx-3 text-black rounded-md"
              name="reviewerEmail"
              onChange={change}
              placeholder="Enter rating here"
            />
          </div>
          <button
            className="bg-blue-700  w-32 text-center rounded-md h-10 my-2"
            onClick={submit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductPage;
