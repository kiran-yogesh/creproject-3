import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
  });
  const { token, logout } = useAuth();

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/api/transactions", {
      headers: { Authorization: token },
    });
    setTransactions(res.data.reverse());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/transactions", form, {
      headers: { Authorization: token },
    });
    setForm({ type: "expense", amount: "", category: "" });
    fetchTransactions();
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
      headers: { Authorization: token },
    });
    fetchTransactions(); // Refresh after delete
  } catch (err) {
    console.error("Delete error:", err.message); // Log the error
  }
};


  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const netBalance = totalIncome - totalExpense;

  const highestExpense = Math.max(
    ...transactions
      .filter((tx) => tx.type === "expense")
      .map((tx) => parseFloat(tx.amount)),
    0
  );
  const highestIncome = Math.max(
    ...transactions
      .filter((tx) => tx.type === "income")
      .map((tx) => parseFloat(tx.amount)),
    0
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-2xl shadow-2xl p-8 relative z-10 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-indigo-700">
            Finance Dashboard
          </h2>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-100 text-green-800 rounded-xl p-4 shadow">
            <h4 className="font-bold text-lg">Income</h4>
            <p className="text-2xl mt-1">₹{totalIncome}</p>
          </div>
          <div className="bg-red-100 text-red-800 rounded-xl p-4 shadow">
            <h4 className="font-bold text-lg">Expense</h4>
            <p className="text-2xl mt-1">₹{totalExpense}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 rounded-xl p-4 shadow">
            <h4 className="font-bold text-lg">Balance</h4>
            <p className="text-2xl mt-1">₹{netBalance}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 rounded-xl p-4 shadow">
            <h4 className="font-bold text-lg">Transactions</h4>
            <p className="text-2xl mt-1">{transactions.length}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-red-200 text-red-900 rounded-xl p-4 shadow">
            <h4 className="font-bold text-lg">Highest Expense</h4>
            <p className="text-xl mt-1">₹{highestExpense}</p>
          </div>
          <div className="bg-green-200 text-green-900 rounded-xl p-4 shadow">
            <h4 className="font-bold text-lg">Highest Income</h4>
            <p className="text-xl mt-1">₹{highestIncome}</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          <select
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="number"
            placeholder="Amount (₹)"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <input
            placeholder="Category"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <button
            type="submit"
            className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all font-semibold"
          >
            Add Transaction
          </button>
        </form>

        {/* Transaction List */}
        <ul className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400">
          {transactions.map((tx) => (
            <li
              key={tx._id}
              className={`flex justify-between items-center p-4 rounded-lg border-l-8 transition-all duration-300 relative group ${
                tx.type === "income"
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <div>
                <p className="text-lg font-bold text-gray-700">
                  ₹{tx.amount}{" "}
                  <span className="text-sm font-normal italic text-gray-500">
                    ({tx.type})
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 font-medium shadow">
                  {tx.category}
                </span>
                <button
                  onClick={() => handleDelete(tx._id)}
                  className="text-red-600 hover:underline text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
