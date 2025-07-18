import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d5?auto=format&fit=crop&w=1600&q=80"
        alt="Finance Background"
        className="absolute inset-0 w-full h-full object-cover filter brightness-50 animate-slow-zoom"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/80 via-indigo-900/90 to-black/95 z-10" />
      
      {/* Floating light bubbles */}
      <div className="absolute top-10 left-5 w-24 h-24 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-700 rounded-full opacity-15 blur-2xl animate-float" />
      
      {/* Glassmorphism Card */}
      <div className="relative z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl p-10 w-full max-w-md animate-fade-slide-up">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 tracking-tight drop-shadow-md">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-indigo-300 mb-8">
          Login to <span className="font-semibold text-indigo-400">Finance Tracker</span>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-4 rounded-lg bg-white/20 placeholder-indigo-300 text-white border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 rounded-lg bg-white/20 placeholder-indigo-300 text-white border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white font-bold py-4 rounded-lg hover:from-indigo-600 hover:via-purple-700 hover:to-indigo-800 shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>
        
        <p className="mt-6 text-center text-indigo-300 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="font-semibold hover:underline text-indigo-400">
            Register here
          </a>
        </p>
      </div>
      
      {/* Tailwind Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fade-slide-up {
          0% { opacity: 0; transform: translateY(20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s ease-in-out infinite;
        }
        .animate-fade-slide-up {
          animation: fade-slide-up 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
}

