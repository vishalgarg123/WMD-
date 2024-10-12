import mongoose, { Document, Schema } from 'mongoose';

// Define Wallet types
export interface IWallet extends Document {
  userId: mongoose.Schema.Types.ObjectId;     //reference to the user
  name: string;                               //define the name of wallet
  type: 'cash' | 'bank account' | 'credit card'; // Define wallet types
  initialBalance: number;                     //define the initialBalence of wallet
  createdAt: Date;
  updatedAt: Date;
}

// Define Wallet Schema
const WalletSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['cash', 'bank account', 'credit card'], required: true },
    initialBalance: { type: Number, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export Wallet Model
export default mongoose.model<IWallet>('Wallet', WalletSchema);