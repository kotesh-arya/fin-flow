import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  transactionType: { type: String, required: true, unique: false },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" },
  userEmail: { type: String, required: true },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
