import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Trash2, ShoppingCart, Star, CreditCard, 
  ChevronRight, Minus, Plus 
} from 'lucide-react';

function MyCart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart products
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const id = localStorage.getItem('auth-id');
      const idInfo = { authID: id };
      
      const response = await axios.post('http://localhost:5000/activeUser', idInfo);
      
      if (response.data === null) {
        navigate('/loginpage');
        Swal.fire('You need to login first');
        return;
      }

      // Add quantity property to each product
      const productsWithQuantity = response.data.CartDetails.reverse().map(product => ({
        ...product,
        quantity: 1
      }));

      setProducts(productsWithQuantity);
      setEmail(response.data.email);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart products:', error);
      setIsLoading(false);
      Swal.fire('Error', 'Unable to fetch cart products', 'error');
    }
  };

  // Initial product fetch
  useEffect(() => {
    getProducts();
  }, []);

  // Remove item from cart
  const removeItem = async (itemTitle) => {
    try {
      const data = {
        item_name: itemTitle,
        user_email: email
      };

      await axios.post(`http://localhost:5000/mycart/delete`, data);
      
      // Update local state
      setProducts(prev => prev.filter(item => item.title !== itemTitle));
      
      Swal.fire({
        icon: 'success',
        title: 'Item Removed',
        text: 'The item has been removed from your cart.',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error removing item:', error);
      Swal.fire('Error', 'Unable to remove item from cart', 'error');
    }
  };

  // Update product quantity
  const updateQuantity = (title, change) => {
    setProducts(prev => 
      prev.map(item => 
        item.title === title 
          ? { 
              ...item, 
              quantity: Math.max(1, (item.quantity || 1) + change) 
            }
          : item
      )
    );
  };

  // Navigate to buy page
  const navigateToBuyPage = (product) => {
    navigate('/buyPage', { state: { productInfo: { product } } });
  };

  // Calculate total price
  const calculateTotal = () => {
    return products.reduce((total, item) => 
      total + (Math.floor(item.price * 83) * (item.quantity || 1)), 0
    );
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (products.length === 0) {
      Swal.fire('Your cart is empty');
      return;
    }

    // Navigate to checkout with cart details
    navigate('/checkout', { 
      state: { 
        products: products, 
        totalPrice: calculateTotal() 
      } 
    });
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Render empty cart
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <ShoppingCart className="h-32 w-32 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          Continue Shopping <ChevronRight className="ml-2" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 lg:mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 flex items-center">
          <ShoppingCart className="mr-4 text-blue-600" /> My Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {products.map((item) => (
              <div 
                key={item.title} 
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
              >
                {/* Product Image */}
                <div className="md:w-1/3 p-4">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-52 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center text-yellow-500 mb-2">
                    <Star className="h-5 w-5 mr-2 fill-current" />
                    <span>{item.rating} / 5</span>
                  </div>

                  {/* Price and Discount */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 mr-3">
                        ₹{Math.floor(item.price * 83).toLocaleString('en-IN')}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        {item.discountPercentage}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => updateQuantity(item.title, -1)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-xl font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.title, 1)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => navigateToBuyPage(item)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Buy Now
                      </button>
                      <button 
                        onClick={() => removeItem(item.title)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <CreditCard className="mr-3 text-purple-600" /> Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({products.length})</span>
                  <span className="font-semibold">
                    ₹{calculateTotal().toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button 
                onClick={proceedToCheckout}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;