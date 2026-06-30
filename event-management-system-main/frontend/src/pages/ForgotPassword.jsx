import React, { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const text = await res.text();
      let data = {};
      if (text) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          try {
            data = JSON.parse(text);
          } catch (parseError) {
            console.error('Failed to parse send-otp response as JSON:', text);
            setError(text || 'Invalid response from server.');
            return;
          }
        } else {
          setError(text);
          return;
        }
      }

      if (res.ok && data.success) {
        setMessage(data.message || 'If this email exists, a reset link will be sent.');
        try {
          if (data.previewUrl && process.env.NODE_ENV !== 'production') {
            window.open(data.previewUrl, '_blank');
          }
        } catch (e) {
          // ignore
        }
      } else {
        setError(data?.message || 'Failed to send reset link.');
      }
    } catch (err) {
      console.error('Forgot password send-otp failed:', err);
      setError(err?.message || 'Failed to send reset link.');
    }
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
