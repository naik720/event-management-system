import React from "react";

const Login = () => {
  return (
    <main className="flex min-h-screen">
      
      {/* Left Section */}
      <section className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
        
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865"
          alt="event"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col justify-between p-10 text-white w-full">

          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              EventCommand
            </h1>
          </div>

          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Command your event lifecycle with precision.
            </h2>

            <p className="text-gray-300 text-lg">
              The unified platform for professional event logistics,
              vendor coordination, and high-stakes execution.
            </p>
          </div>

          <div>
            <p className="uppercase tracking-widest text-sm text-gray-300">
              Trusted by 500+ Global Agencies
            </p>
          </div>

        </div>
      </section>

      {/* Right Section */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        
        <div className="w-full max-w-md">

          <h2 className="text-4xl font-bold mb-2">
            Welcome back
          </h2>

          <p className="text-gray-500 mb-8">
            Please enter your credentials to access the console.
          </p>

          {/* Role Buttons */}
          <div className="grid grid-cols-4 gap-2 bg-gray-200 p-1 rounded mb-6">

            <button className="bg-white py-2 rounded font-semibold">
              Admin
            </button>

            <button className="py-2 rounded">
              Staff
            </button>

            <button className="py-2 rounded">
              Vendor
            </button>

            <button className="py-2 rounded">
              Client
            </button>

          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              placeholder="name@organization.com"
              className="w-full p-4 border rounded-lg outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">

            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold">
                PASSWORD
              </label>

              <button className="text-blue-600 text-sm">
                Forgot Password?
              </button>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 border rounded-lg outline-none"
            />
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" />
            <span>Remember Me</span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold mb-6">
            AUTHORIZE ACCESS →
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 border"></div>

            <span className="text-sm text-gray-500">
              OR CONTINUE WITH
            </span>

            <div className="flex-1 border"></div>
          </div>

          {/* Google Button */}
          <button className="w-full border py-4 rounded-xl bg-white">
            Organization Single Sign-On (SSO)
          </button>

          {/* Footer */}
          <div className="mt-10 text-center">

            <p className="text-gray-500">
              Don't have an organization account?
              <span className="text-blue-600 font-semibold cursor-pointer">
                {" "}Contact Support
              </span>
            </p>

            <div className="flex justify-center gap-3 mt-4 text-xs text-gray-400 uppercase">
              <span>Security Policy</span>
              <span>•</span>
              <span>Privacy Terms</span>
              <span>•</span>
              <span>v4.2.0-PRO</span>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
};

export default Login;