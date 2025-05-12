import React, { useEffect, useState } from 'react';
import DisplayBox from './DisplayBox';
import FrontBanner from './FrontBanner';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

function FrontPageProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate indexes and total pages
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentItems = products.slice(firstItemIndex, lastItemIndex);

  // Show specific number of pages in pagination control
  const pageNumbers = [];
  const maxPageButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Loading skeletons
  const LoadingSkeleton = () => (
    <div className="w-full h-full min-h-screen flex flex-col items-center">
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md mb-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl px-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-300 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 animate-pulse rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 animate-pulse rounded mb-4 w-1/2"></div>
              <div className="h-10 bg-gray-300 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Error state
  if (!loading && !products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="text-red-500 text-5xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Unable to load products</h2>
        <p className="text-gray-600 mb-6">There was an error loading the product data. Please try again later.</p>
        <button 
          onClick={fetchProducts}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <FrontBanner />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Product Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
              <div className="h-1 w-24 bg-blue-600 mt-2"></div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentItems.map((product, index) => (
                <div key={index} className="transform transition-transform duration-300 hover:scale-105">
                  <DisplayBox product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex flex-col items-center">
              <div className="text-sm text-gray-600 mb-4">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors duration-300 flex items-center`}
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </button>

                <div className="hidden md:flex space-x-1 mx-2">
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-300 ${
                        currentPage === number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors duration-300 flex items-center`}
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FrontPageProducts;