import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
    "https://images.unsplash.com/photo-1511578314322-379afb476865",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Transitions comfortably every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-6">

        {/* LEFT SIDE */}
        <div className="text-white md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-6xl font-extrabold leading-tight">
            EVENTS
            <br />
            <span className="text-blue-400">THAT INSPIRE</span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-lg">
            Discover, book, and experience extraordinary events around the world.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-10 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-3 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-200 mb-8 text-center">
            Login to continue your journey with Evito.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <label className="text-white block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-xl mb-5 outline-none bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:bg-white/30"
            />

            <div className="flex justify-between mb-2">
              <label className="text-white">Password</label>
              <span className="text-blue-400 cursor-pointer text-sm hover:underline">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-4 rounded-xl mb-6 outline-none bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:bg-white/30"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white p-4 rounded-xl font-semibold"
            >
              SIGN IN
            </button>

            <div className="text-center text-gray-300 my-5">OR</div>

            <button
              type="button"
              className="w-full bg-white text-black p-4 rounded-xl font-medium hover:bg-gray-100 transition-all"
            >
              Sign in with Google
            </button>

            <div className="mt-8 text-center text-gray-300">
              Don’t have an account?
              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 ml-2 cursor-pointer hover:underline font-semibold"
              >
                Create Account
              </span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;