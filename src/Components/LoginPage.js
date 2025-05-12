import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, Mail, User, Phone } from "lucide-react";
import { z } from "zod";

// Form validation schemas
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for existing user on component mount
  useEffect(() => {
    const checkActiveUser = async () => {
      try {
        const id = localStorage.getItem('auth-id');
        if (id) {
          const response = await axios.post('http://localhost:5000/activeUser', { authID: id });
          if (response.data) {
            navigate('/UserPage', { state: { userdata: { data: response.data } } });
          }
        }
      } catch (error) {
        console.error("Error checking active user:", error);
      }
    };

    checkActiveUser();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form based on current mode (login/signup)
      const validationSchema = isLogin ? LoginSchema : SignupSchema;
      const result = validationSchema.safeParse(
        isLogin 
          ? { email: formData.email, password: formData.password }
          : formData
      );

      if (!result.success) {
        // Set validation errors
        const errorMap = result.error.flatten().fieldErrors;
        setErrors(errorMap);
        setIsSubmitting(false);
        return;
      }

      // Prepare endpoint and data
      const endpoint = isLogin ? 'login' : 'newUser';
      const submitData = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      // Submit form
      const response = await axios.post(`http://localhost:5000/${endpoint}`, submitData);
      
      // Store auth token
      localStorage.setItem('auth-id', response.data);

      // Show success and navigate
      alert(isLogin ? "Welcome Back!" : "Account Created Successfully!");
      navigate("/");

    } catch (error) {
      // Handle submission errors
      console.error("Submission error:", error);
      alert(error.response?.data || "An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form and errors when switching modes
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: ""
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-900 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Mode Toggle */}
        <div className="flex">
          <button 
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-4 text-xl font-semibold transition-colors duration-300 
              ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-4 text-xl font-semibold transition-colors duration-300 
              ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {/* Conditional Signup Fields */}
          {!isLogin && (
            <>
              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                    ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>}
              </div>
            </>
          )}

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              transition-colors duration-300 flex items-center justify-center
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              isLogin ? "Log In" : "Sign Up"
            )}
          </button>

          {/* Mode Toggle Link */}
          <div className="text-center mt-4">
            <button 
              type="button"
              onClick={toggleMode}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;