import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });

  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErr = { username: !username.trim(), password: !password.trim() };
    setErrors(newErr);
    if (newErr.username || newErr.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("/auth", { username, password });
      setToken(res.data.token);
      setUser(res.data.user);
      toast.success("Login successful!");
      navigate("/profile");
    } catch {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-600 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl flex overflow-hidden">
        <div className="bg-gray-900 text-white w-1/2 hidden md:flex flex-col items-center justify-center p-10">
          <img src="/img/logo.png" alt="Logo" className="w-28 h-28 mb-6" />
          <p className="text-lg text-gray-300 mb-2">Welcome back to</p>
          <h1 className="text-5xl font-light">Shopping List</h1>
        </div>
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-lg text-gray-700">Username</label>
              <input
                placeholder="eshmatjon123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-5 py-3 border rounded-lg text-lg ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none`}
              />
            </div>
            <div>
              <label className="block mb-2 text-lg text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-3 border rounded-lg text-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none`}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-lg font-semibold transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-gray-700 text-base">
            No account yet?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
