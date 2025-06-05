const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'] },
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Transaction', transactionSchema);
