import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { 
  ShoppingCart, 
  Eye, 
  CreditCard, 
  Star, 
  Tag 
} from "lucide-react";

// Skeleton Loading Component
function DisplayBoxSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden animate-pulse bg-gray-100">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
          <path d="M480 80C480 35.82 444.18 0 400 0H240C195.82 0 160 35.82 160 80V128H80C35.82 128 0 163.82 0 208V432C0 476.18 35.82 512 80 512H400C444.18 512 480 476.18 480 432V80zM240 128V80C240 53.49 261.49 32 288 32H352C378.51 32 400 53.49 400 80V128H240zM400 224C400 206.33 386.67 192 369 192H302.41L350.58 143.83C361.87 132.54 361.87 113.47 350.58 102.17C339.29 90.88 320.22 90.88 308.93 102.17L240 171.1L171.07 102.17C159.78 90.88 140.71 90.88 129.42 102.17C118.13 113.47 118.13 132.54 129.42 143.83L177.59 192H113C95.33 192 82 206.33 82 224V369C82 386.67 95.33 400 113 400H369C386.67 400 400 386.67 400 369V224z"/>
        </svg>
      </div>
      
      {/* Details Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        
        {/* Price Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
        
        {/* Tags Skeleton */}
        <div className="flex space-x-2">
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>
        </div>
        
        {/* Buttons Skeleton */}
        <div className="flex space-x-2">
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

function DisplayBox({ product, isLoading = false }) {
  const navigate = useNavigate();
  
  // If loading, render skeleton
  if (isLoading) {
    return <DisplayBoxSkeleton />;
  }

  // Calculate price and derive additional product info
  const price = Math.round(product.price * 83);
  const tag = product.tags[1] || product.category;
  const ratings = ((price % 10) % 4) + 2;

  // Navigation and cart/buy handlers
  const navigateToProductPage = () => {
    navigate('/loading');
    setTimeout(() => {
      navigate("/productpage", { state: { productinfo: { product } } });
    }, 3000);
  };

  const addToCart = async () => {
    try {
      const id = localStorage.getItem('auth-id');
      const idInfo = { authID: id };
      const userdata = await axios.post('http://localhost:5000/activeUser', idInfo);
      
      if (!userdata.data) {
        navigate('/loginpage');
        Swal.fire("Login First");
        return;
      }

      await axios.post(`http://localhost:5000/usercart/${userdata.data.email}`, product);
      
      navigate('/loading');
      setTimeout(() => {
        navigate("/mycart"); 
        Swal.fire({
          title: "Success",
          text: "Added to cart successfully",
          icon: "success",
          confirmButtonText: "Check out!",
        });
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Error", "Failed to add item to cart", "error");
    }
  };

  const buyNow = async () => {
    try {
      const id = localStorage.getItem('auth-id');
      const idInfo = { authID: id };
      const info = await axios.post('http://localhost:5000/activeUser', idInfo);
      
      if (!info.data) {
        navigate('/loginpage');
        Swal.fire("Login First");
        return;
      }

      Swal.fire({
        title: "Success",
        text: "Let's Buy!",
        icon: "success",
        confirmButtonText: "Buy Now!",
      });
      
      navigate("/buyPage", { state: { productInfo: { product } } });
    } catch (error) {
      console.error("Error processing buy:", error);
      Swal.fire("Error", "Unable to process purchase", "error");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-white">
      {/* Product Image */}
      <button 
        onClick={navigateToProductPage} 
        className="w-full block group"
      >
        <div className="relative overflow-hidden">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </button>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 
          onClick={navigateToProductPage}
          className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
        >
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
          
          {/* Rating */}
          <div className="flex items-center text-yellow-500">
            {[...Array(ratings)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
            <span className="text-gray-500 ml-2 text-sm">({ratings}/5)</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex space-x-2">
          <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {product.tags[0]}
          </span>
          <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button 
            onClick={buyNow}
            className="flex-1 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Check Out
          </button>
          <button 
            onClick={addToCart}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default DisplayBox;