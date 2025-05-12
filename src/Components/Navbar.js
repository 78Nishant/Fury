import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import custom icons
import { ShoppingCart, Search, Menu, X, User, MapPin } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Log in / Sign up");
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Deliverable addresses
  const deliverableAddresses = [
    "Pune",
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Kolkata",
    "Patna",
    "Chennai",
    "Chandigarh",
    "Lucknow",
  ];

  // Get user info on component mount
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const id = localStorage.getItem("auth-id");
        if (!id) return;
        
        const response = await axios.post("http://localhost:5000/activeUser", {
          authID: id
        });
        
        if (response.data) {
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    
    getUserInfo();
  }, []);

  // Navigation handlers
  const handleLogin = () => {
    navigate("/loginpage");
  };

  const handleCartClick = () => {
    setIsLoading(true);
    navigate('/loading');
    setTimeout(() => {
      navigate('/mycart');
      setIsLoading(false);
    }, 3000);
  };

  const handleSearch = (e) => {
    if (e.type === "click" || (e.key === "Enter" && searchValue.trim())) {
      setIsLoading(true);
      navigate('/loading');
      setTimeout(() => {
        navigate('/search', { state: { search: searchValue.toLowerCase().trim() } });
        setIsLoading(false);
      }, 3000);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Main navbar container */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Menu button and logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              aria-label="Toggle menu"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <a href="/" className="text-2xl font-bold text-black">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">FURY</span>
            </a>
          </div>
          
          {/* Middle section: Location selector and search bar */}
          <div className="hidden md:flex items-center flex-1 mx-4 space-x-4">
            <div className="flex items-center bg-gray-100 rounded-md px-2 max-w-xs">
              <MapPin size={16} className="text-gray-500" />
              <select 
                className="bg-gray-100 py-2 pl-1 pr-8 rounded-md text-sm focus:outline-none"
                aria-label="Select delivery location"
              >
                {deliverableAddresses.map((address, index) => (
                  <option key={index} value={address}>{address}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 relative">
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden px-4 py-2">
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-transparent border-none outline-none text-sm"
                  placeholder="Search Fury.in"
                  aria-label="Search products"
                />
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  aria-label="Search"
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right section: Cart and User profile */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCartClick}
              disabled={isLoading}
              aria-label="Go to cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="hidden md:inline-block ml-1 text-sm">Cart</span>
            </button>
            
            <button 
              onClick={handleLogin}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User size={20} />
              <div className="hidden md:block text-left">
                <p className="text-xs text-gray-500">Hello!</p>
                <p className="text-sm font-medium truncate max-w-xs">{userName}</p>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile search bar */}
        <div className="md:hidden py-2">
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden px-4 py-2">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-transparent border-none outline-none text-sm"
              placeholder="Search Fury.in"
              aria-label="Search products"
            />
            <button 
              onClick={handleSearch}
              disabled={isLoading}
              aria-label="Search"
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>
          
          {/* Sidebar content */}
          <div className="relative bg-white w-64 max-w-xs h-full overflow-y-auto shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">FURY</span>
                <button 
                  onClick={toggleSidebar}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="/" className="block px-4 py-2 rounded-md hover:bg-gray-100">Home</a>
                </li>
                <li>
                  <a href="/categories" className="block px-4 py-2 rounded-md hover:bg-gray-100">Categories</a>
                </li>
                <li>
                  <a href="/deals" className="block px-4 py-2 rounded-md hover:bg-gray-100">Today's Deals</a>
                </li>
                <li>
                  <a href="/orders" className="block px-4 py-2 rounded-md hover:bg-gray-100">Your Orders</a>
                </li>
                <li>
                  <a href="/wishlist" className="block px-4 py-2 rounded-md hover:bg-gray-100">Wishlist</a>
                </li>
              </ul>
              
              <div className="mt-8 border-t pt-4">
                <div className="px-4 py-2">
                  <p className="text-sm text-gray-500">Deliver to</p>
                  <select 
                    className="w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none text-sm"
                    aria-label="Select delivery location"
                  >
                    {deliverableAddresses.map((address, index) => (
                      <option key={index} value={address}>{address}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 px-4">
                <button 
                  onClick={handleLogin}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  {userName === "Log in / Sign up" ? "Sign in" : "Account"}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;