import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { saveClientProfile } from "../user-dashboard/services/clientSession";

const DEMO_ACCOUNTS = {
  vendor: {
    email: "vendor@gmail.com",
    password: "vedoor@123",
    route: "/vendor/dashboard",
  },
  staff: {
    email: "staff@gmail.com",
    password: "staff@123",
    route: "/staff/dashboard",
  },
};

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Checks if the user was kicked here from the event management dashboard
  const fromEventManagement = searchParams.get("from") === "event-management";

  const images = useMemo(
    () => [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    ],
    []
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const enteredEmail = formData.email.trim().toLowerCase();
      const enteredPassword = formData.password;
      const demoAccount = Object.entries(DEMO_ACCOUNTS).find(([, account]) => {
        return account.email === enteredEmail && account.password === enteredPassword;
      });

      if (demoAccount) {
        const [role, account] = demoAccount;
        const loginTime = new Date().toISOString();
        const demoUser = {
          email: account.email,
          role,
          name: role === "vendor" ? "Vendor Account" : "Staff Account",
          lastLogin: loginTime,
          memberSince: loginTime,
        };

        localStorage.setItem("token", `demo-${role}-token`);
        localStorage.setItem("loggedInUser", JSON.stringify(demoUser));
        localStorage.setItem("user", JSON.stringify(demoUser));
        localStorage.setItem("userRole", role);

        setTimeout(() => {
          navigate(account.route);
        }, 100);

        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const loginTime = new Date().toISOString();
        const updatedUser = {
          ...data.user,
          lastLogin: loginTime,
          memberSince: data.user.createdAt || loginTime,
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("userRole", data.user.role || "client");
        saveClientProfile(updatedUser);

        // 🚀 Redirect securely to the correct dashboard routes
        setTimeout(() => {
          if (fromEventManagement) {
            // Updated to point to your actual event management path!
            navigate("/user/event-management");
          } else {
            navigate("/user/dashboard");
          }
        }, 100);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to server.");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await response.json();

        if (data.success) {
          const loginTime = new Date().toISOString();
          const updatedUser = {
            ...data.user,
            lastLogin: loginTime,
            memberSince: data.user.createdAt || loginTime,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
          if (data.token) localStorage.setItem("token", data.token);
          localStorage.setItem("userRole", data.user.role || "client");
          saveClientProfile(updatedUser);

          // 🚀 Redirect securely to the correct dashboard routes (Google Login)
          setTimeout(() => {
            if (fromEventManagement) {
              // Updated to point to your actual event management path!
              navigate("/user/event-management");
            } else {
              navigate("/user/dashboard");
            }
          }, 100);
        } else {
          alert("Authentication failed: " + data.message);
        }
      } catch (error) {
        console.error("Error connecting to backend auth server:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between px-6">
        <div className="text-white md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-6xl font-extrabold leading-tight">
            EVENTS
            <br />
            <span className="text-blue-400">THAT INSPIRE</span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-lg">
            Discover, book, and experience extraordinary events around you.
          </p>
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-10 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-3 text-center">Welcome Back</h2>
          <p className="text-gray-200 mb-8 text-center">Login to continue your journey with us.</p>

          <form onSubmit={handleSubmit}>
            <label className="text-white block mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-4 rounded-xl mb-5 outline-none bg-white/20 text-white border border-white/30 focus:bg-white/30"
            />

            <div className="flex justify-between mb-2">
              <label className="text-white">Password</label>
              <span
                onClick={() => navigate('/forgot-password')}
                className="text-blue-400 cursor-pointer text-sm hover:underline"
              >
                Forgot password?
              </span>
            </div>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-4 rounded-xl mb-3 outline-none bg-white/20 text-white border border-white/30 focus:bg-white/30"
            />

            {error && (
              <p className="mb-4 text-sm text-red-100 bg-red-500/20 border border-red-300/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition-all">
              SIGN IN
            </button>

            <div className="text-center text-gray-300 my-5">OR</div>

            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              className="w-full bg-white text-black p-4 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </button>

            <div className="mt-8 text-center text-gray-300">
              Don't have an account?
              <span onClick={() => navigate("/register")} className="text-blue-400 ml-2 cursor-pointer hover:underline font-semibold">
                Create Account
              </span>
            </div>
          </form>

          <div className="mt-6 rounded-2xl border border-white/15 bg-black/20 p-4 text-sm text-gray-200">
            <p className="font-semibold text-white">Demo access</p>
            <p className="mt-1">
              Vendor: <span className="font-mono">vendor@gmail.com / vedoor@123</span>
            </p>
            <p className="mt-1">
              Staff: <span className="font-mono">staff@gmail.com / staff@123</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
