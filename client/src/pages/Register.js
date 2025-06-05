import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1556742045-1b34b1d3c1e2?auto=format&fit=crop&w=1600&q=80"
        alt="Register Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/80 to-cyan-800/90 z-10" />

      {/* Form Card */}
      <div className="relative z-20 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Join <span className="text-cyan-600 font-medium">Finance Tracker</span> today
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-all duration-300 font-semibold"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
