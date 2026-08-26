import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideImage from "./SideImage";
import { User, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Info } from 'lucide-react';

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ name: "", password: "" });
  const [showHint, setShowHint] = useState(false);

  // Regex patterns
  const nameRegex = /^[A-Za-z\s]{3,30}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: "", password: "" };

    // Validate name
    if (!nameRegex.test(name)) {
      newErrors.name = "Name must be 3–30 letters long (letters and spaces only).";
      valid = false;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      newErrors.password = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special char (@$!%*?&).";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const userKey = name.trim().toLowerCase();
      localStorage.setItem('currentUser', userKey);
      localStorage.setItem('isLoggedIn', 'true');
      setIsAuthenticated(true);
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center p-4 font-sans text-gray-800">

      {/* Login Container Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden my-6 transition-all">

        {/* Left Side Brand Column */}
        <SideImage />

        {/* Right Side Form Column */}
        <div className="w-full md:w-3/5 p-8 sm:p-12 flex flex-col justify-between text-left">

          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900">
                Welcome Back
              </h1>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100"
              >
                <Info size={14} /> {showHint ? "Hide Demo Hint" : "Demo Credentials"}
              </button>
            </div>

            {/* Helper Hint Box */}
            {showHint && (
              <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-1 text-amber-900">Valid Format Example:</p>
                <p>• <strong>Name:</strong> Syed Rahil (3-30 letters)</p>
                <p>• <strong>Password:</strong> DemoPass@123 (Min 8 chars, 1 uppercase, 1 number, 1 special symbol)</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name Input Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Syed Rahul"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg text-sm text-gray-900 outline-none transition ${errors.name
                        ? "border-red-500 bg-red-50/20 focus:border-red-600"
                        : "border-gray-300 focus:border-blue-600 focus:bg-white"
                      }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={13} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Password Input Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-11 py-3 bg-gray-50 border rounded-lg text-sm text-gray-900 outline-none transition ${errors.password
                        ? "border-red-500 bg-red-50/20 focus:border-red-600"
                        : "border-gray-300 focus:border-blue-600 focus:bg-white"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1 leading-snug">
                    <AlertCircle size={13} className="flex-shrink-0" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Terms & Privacy Notice */}
              <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
                By continuing, you agree to themarketplace's{" "}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  Privacy Policy
                </span>.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FB641B] hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-lg shadow-md transition cursor-pointer text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>

            </form>
          </div>

          {/* Bottom Signup Prompt */}
          <div className="border-t border-gray-100 pt-5 mt-6 text-center text-xs text-gray-600 font-medium">
            New to themarketplace?{" "}
            <span className="text-blue-600 font-bold hover:underline cursor-pointer">
              Create an account
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
