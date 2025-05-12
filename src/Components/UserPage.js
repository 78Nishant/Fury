import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Phone, Mail, LogOut, Edit, Settings, 
  ShoppingCart, Heart, History, CreditCard 
} from 'lucide-react';
import Swal from 'sweetalert2';

function UserPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(location.state.userdata.data);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...userdata });

  const logout = async () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('auth-id');
        navigate('/');
        window.location.reload();
      }
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveUserChanges = async () => {
    try {
      // Implement your update user API call here
      // const response = await axios.put('your-update-endpoint', editedUser);
      
      setUserdata(editedUser);
      setIsEditing(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been successfully updated!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Unable to update profile. Please try again.',
      });
    }
  };

  const renderProfileSection = () => {
    return (
      <div className="bg-white shadow-2xl rounded-2xl p-8 lg:p-20  max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img 
              className="h-40 w-40 rounded-full object-cover border-4 border-blue-500 shadow-lg" 
              src="https://avatar.iran.liara.run/public/9" 
              alt="user profile"
            />
            <button 
              onClick={handleEditToggle}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{userdata.name}</h2>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={handleEditToggle}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveUserChanges}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
              <User className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-gray-600 font-semibold">Username</p>
                <p className="text-xl font-bold text-gray-800">{userdata.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
              <Phone className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-gray-600 font-semibold">Phone Number</p>
                <p className="text-xl font-bold text-gray-800">+91 {userdata.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
              <Mail className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-gray-600 font-semibold">Email Address</p>
                <p className="text-xl font-bold text-gray-800">{userdata.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/mycart')}
            className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-sm font-semibold">My Cart</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Heart className="h-6 w-6 text-red-500 mb-2" />
            <span className="text-sm font-semibold">Wishlist</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <History className="h-6 w-6 text-green-500 mb-2" />
            <span className="text-sm font-semibold">Order History</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <CreditCard className="h-6 w-6 text-purple-500 mb-2" />
            <span className="text-sm font-semibold">Payments</span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={logout}
            className="flex items-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center p-4">
      {renderProfileSection()}
    </div>
  );
}

export default UserPage;