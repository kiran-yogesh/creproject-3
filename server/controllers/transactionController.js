const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { type, amount, category } = req.body;
  const transaction = await Transaction.create({ ...req.body, userId: req.user.id });
  res.status(201).json(transaction);
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id });
  res.json(transactions);
};
