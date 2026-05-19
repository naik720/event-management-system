import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    // Here you would send a request to your backend to handle forgot password
    // Example:
    // await axios.post("/forgot-password", { email });
    setMessage("If this email exists, a reset link will be sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-white mb-3 text-lg">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 mb-4 bg-transparent border border-white/20 rounded-2xl text-white placeholder:text-gray-400 outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          {error && <div className="bg-red-600 text-white px-4 py-2 rounded-xl mb-4 text-center font-semibold">{error}</div>}
          {message && <div className="bg-green-600 text-white px-4 py-2 rounded-xl mb-4 text-center font-semibold">{message}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition py-3 rounded-2xl text-white font-bold text-lg mt-2 shadow-lg"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
