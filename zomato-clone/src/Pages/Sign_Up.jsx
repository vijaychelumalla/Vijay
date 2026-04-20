import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import DessertImage from "../Image/zomato2.avif";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      // Optionally save token: localStorage.setItem("token", response.data.token);
      alert("Account created successfully!");
      navigate("/login", { state: { from: location.state?.from } });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-6 animate-fade-in-up">
      <div className="w-full max-w-[1000px] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Create an Account
          </h2>
          <p className="text-gray-500 mb-6 font-medium">Join Zomato and start ordering your favorites.</p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm font-semibold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text" name="fullName" required
                value={formData.fullName} onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email" name="email" required
                value={formData.email} onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <input
                type="tel" name="phone" required
                value={formData.phone} onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input
                  type="password" name="password" required minLength="6"
                  value={formData.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  type="password" name="confirmPassword" required
                  value={formData.confirmPassword} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className={`w-full py-3.5 px-4 text-white rounded-xl font-bold transition-all duration-300 mt-6 ${loading ? 'bg-primary-500 opacity-70 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg'}`}
            >
              {loading ? 'Creating Account...' : 'Sign Up Now'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6 font-medium">
            Already have an account?{" "}
            <NavLink to="/login" state={{ from: location.state?.from }} className="text-primary-600 hover:text-primary-700 transition">Login here</NavLink>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-1/2 relative bg-gray-900 border-r border-gray-100">
           <img className="absolute inset-0 w-full h-full object-cover opacity-85" src={DessertImage} alt="Delicious Pizza" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
           <div className="absolute bottom-12 left-12 right-12 text-white">
              <h2 className="text-4xl font-black mb-3">Your Next Meal Awaits</h2>
              <p className="text-gray-300 font-medium text-lg text-balance">Sign up today and get exclusive discounts on your first 3 orders.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
