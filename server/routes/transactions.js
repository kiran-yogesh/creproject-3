const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const Transaction = require("../models/Transaction");

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
// Example DELETE route


// DELETE /api/transactions/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;

