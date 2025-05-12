import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Search, Filter } from "lucide-react";
import Swal from "sweetalert2";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(location.state?.search || "");
  const [productArray, setProductArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("relevance");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products
  const getProduct = async () => {
    try {
      setIsLoading(true);
      const product = await axios.get(`http://localhost:5000/search/${search}`);
      setProductArray(product.data);
      setFilteredProducts(product.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  // Initial product fetch
  useEffect(() => {
    if (search) {
      getProduct();
    }
  }, [search]);

  // Sort products
  const sortProducts = (option) => {
    setSortOption(option);
    let sorted = [...filteredProducts];
    switch (option) {
      case "priceLowToHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Relevance (default order)
        break;
    }
    setFilteredProducts(sorted);
  };

  // Add to cart handler
  const addToCart = async (product) => {
    try {
      const id = localStorage.getItem('auth-id');
      const idInfo = { authID: id };
      const userdata = await axios.post('http://localhost:5000/activeUser', idInfo);

      if (userdata.data === null) {
        navigate('/loginpage');
        Swal.fire("Login First");
        return;
      }

      await axios.post(`http://localhost:5000/usercart/${userdata.data.email}`, product);
      
      Swal.fire({
        title: "Success",
        text: "Added to cart successfully",
        icon: "success",
        confirmButtonText: "Check out!",
      });

      navigate('/mycart');
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Error", "Failed to add item to cart", "error");
    }
  };

  // Navigate to product details
  const navigateToProductPage = (product) => {
    navigate("/productpage", { state: { productinfo: { product } } });
  };

  // Perform new search
  const performSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      getProduct();
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Render no results
  if (productArray.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <img 
          src="/api/placeholder/400/300" 
          alt="No results" 
          className="mb-6 max-w-sm"
        />
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Sorry! No results found
        </h2>
        <p className="text-gray-500 mb-6">Try a different search term</p>
        <form onSubmit={performSearch} className="w-full max-w-md">
          <div className="relative">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search again..." 
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-md"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 lg:mt-10">
      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            Showing results for: <span className="text-blue-600">{search}</span>
          </h2>
          
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select 
                value={sortOption}
                onChange={(e) => sortProducts(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <div 
                onClick={() => navigateToProductPage(item)}
                className="cursor-pointer"
              >
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h3 
                  onClick={() => navigateToProductPage(item)}
                  className="text-xl font-bold mb-2 cursor-pointer hover:text-blue-600"
                >
                  {item.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center text-yellow-500 mb-2">
                  <Star className="h-5 w-5 mr-1 fill-current" />
                  <span>{item.rating.toFixed(1)} / 5</span>
                </div>

                {/* Price and Discount */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 mr-3">
                      ₹{Math.floor(item.price * 83).toLocaleString("en-IN")}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {item.discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => navigateToProductPage(item)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;