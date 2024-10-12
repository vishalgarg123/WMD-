import mongoose, { Document, Schema } from "mongoose";

// Define the types for a Transaction
export interface ITransaction extends Document {
  userId: mongoose.Schema.Types.ObjectId;   // Reference to the user
  amount: number;                          // Transaction amount
  date: Date;                              // Transaction date
  category: string;                        // Transaction category
  notes?: string;                          // Optional notes
  type: string;                            // Transaction type: income or expense
}

// Create a schema for the Transaction
const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 }, // Ensure positive amounts
  date: { type: Date, default: Date.now, required: true }, // Default to current date
  category: { type: String, required: true }, // Required category field
  notes: { type: String, trim: true }, // Optional notes field with trimming
  type: { type: String, required: true }, // Transaction type: 'income' or 'expense', no enum restriction
});

// Export the model
export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
