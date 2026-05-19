import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = () => {


  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // Email validation: must contain letters, numbers, special chars, and be valid format
  const validateEmail = (email) => {
    // RFC 5322 Official Standard
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // Must contain at least one letter, one number, one special char
    const hasLetter = /[A-Za-z]/.test(email);
    const hasNumber = /[0-9]/.test(email);
    const hasSpecial = /[._%+-]/.test(email);
    return re.test(email) && hasLetter && hasNumber && hasSpecial;
  };

  // Password validation: min 6 chars, number, special char, capital letter
  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };


  // Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email. Use letters, numbers, special characters, and valid format.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters, include a capital letter, number, and special character.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      setSuccess("Login successfully");
      setError("");
      // Optionally, redirect or store token here
    } catch (error) {
      // Custom error handling for email/password
      const msg = error?.response?.data?.message || "Login failed. Please try again.";
      if (msg.toLowerCase().includes("email")) {
        setError("Email is not correct");
      } else if (msg.toLowerCase().includes("password")) {
        setError("Password is not correct");
      } else {
        setError(msg);
      }
      setSuccess("");
    }
  };

  // Forgot Password Navigation
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <main className="min-h-screen flex bg-[#020617]">

      {/* LEFT SIDE */}
      <section className="hidden lg:flex w-1/2 relative overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop"
          alt="event"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Blue Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-[#020617]/40 to-[#020617]/90"></div>

        {/* Glow Effect */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">

              <span className="text-2xl font-bold">
                E
              </span>

            </div>

            <h1 className="text-4xl font-bold">
              Evito
            </h1>

          </div>

          {/* Main Content */}
          <div className="max-w-xl">

            <h2 className="text-7xl font-extrabold leading-tight mb-6">

              EVENTS
              <br />

              <span className="text-blue-400">
                THAT INSPIRE
              </span>

            </h2>

            <p className="text-blue-100 text-2xl leading-relaxed mb-10">

              Discover, book, and experience extraordinary
              events around the world.

            </p>

            {/* Bottom Info */}
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-blue-500/30 backdrop-blur-md flex items-center justify-center">

                👥

              </div>

              <p className="text-xl text-blue-100 leading-relaxed">

                Join thousands of event lovers and create unforgettable memories.

              </p>

            </div>

          </div>

        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#020617]">

        {/* Glass Card */}
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl">

          {/* Heading */}
          <h2 className="text-5xl font-bold text-white mb-3">
            Welcome Back
          </h2>

          <p className="text-gray-300 text-lg mb-10">
            Login to continue your journey with Evito.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-6">

              <label className="block text-white mb-3 text-lg">
                Email
              </label>

              <div className="flex items-center border border-white/20 rounded-2xl px-5 bg-white/5">

                <Mail className="text-gray-300" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-5 bg-transparent outline-none text-white placeholder:text-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>

            </div>

            {/* Password */}
            <div className="mb-4">

              <div className="flex justify-between items-center mb-3">

                <label className="text-white text-lg">
                  Password
                </label>

                <button
                  type="button"
                  className="text-blue-400 hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>

              </div>

              <div className="flex items-center border border-white/20 rounded-2xl px-5 bg-white/5">

                <Lock className="text-gray-300" />


                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-5 bg-transparent outline-none text-white placeholder:text-gray-400"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <Eye className="text-gray-300" />
                  ) : (
                    <EyeOff className="text-gray-300" />
                  )}
                </button>

              </div>

            </div>


            {/* Error Popup */}
            {error && (
              <div className="bg-red-600 text-white px-4 py-2 rounded-xl mb-4 text-center font-semibold">
                {error}
              </div>
            )}
            {/* Success Popup */}
            {success && (
              <div className="bg-green-600 text-white px-4 py-2 rounded-xl mb-4 text-center font-semibold">
                {success}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition py-5 rounded-2xl text-white font-bold text-lg mt-8 shadow-lg"
            >
              SIGN IN
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">

              <div className="flex-1 border-t border-white/20"></div>

              <span className="text-gray-300">
                or
              </span>

              <div className="flex-1 border-t border-white/20"></div>

            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full bg-white hover:bg-gray-100 transition py-5 rounded-2xl flex items-center justify-center gap-3 text-black font-semibold text-lg"
            >

              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="google"
                className="w-6 h-6"
              />

              Sign in with Google

            </button>

          </form>

          {/* Footer */}
          <div className="mt-10 text-center">

            <p className="text-gray-300 text-lg">

              Don’t have an account?

              <span className="text-blue-400 ml-2 cursor-pointer hover:underline">
                Create Account
              </span>

            </p>

          </div>

        </div>
      </section>
    </main>
  );
};

export default Login;