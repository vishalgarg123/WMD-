import { Request, Response } from 'express';
import Wallet, { IWallet } from '../models/wallet-model';
import {CustomRequest} from "../middlewares/user-middleware"

// Create a new wallet
export const createWallet = async (req:CustomRequest, res: Response): Promise<void> => {
  try {
    const { name, type, initialBalance }: IWallet = req.body;
    if (!req.user ||!req.user._id) {
       res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    
     const userId=req.user?._id
    // Check if all required fields are provided
    if (!name || !type || initialBalance === undefined) {
       res.status(400).json({ message: 'Missing required fields: name, type, initialBalance' });
    }

    // Create the new wallet
    const newWallet = new Wallet({userId, name, type, initialBalance });
    const savedWallet = await newWallet.save();

     res.status(201).json({ message: 'Wallet created successfully', wallet: savedWallet });
  } catch (error) {
    console.error('Error creating wallet:', error);
     res.status(500).json({ message: 'Error creating wallet', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Edit wallet details
export const editWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { walletId } = req.params;
    const { name, type, initialBalance }: IWallet = req.body;

    // Find and update the wallet
    const updatedWallet = await Wallet.findByIdAndUpdate(
      walletId,
      { name, type, initialBalance },
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators` ensures schema validation
    );

    if (!updatedWallet) {
       res.status(404).json({ message: 'Wallet not found' });
    }

     res.status(200).json({ message: 'Wallet updated successfully', wallet: updatedWallet });
  } catch (error) {
    console.error('Error updating wallet:', error);
     res.status(500).json({ message: 'Error updating wallet', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Delete a wallet
export const deleteWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { walletId } = req.params;

    // Find and delete the wallet
    const deletedWallet = await Wallet.findByIdAndDelete(walletId);

    if (!deletedWallet) {
      res.status(404).json({ message: 'Wallet not found' });
    }

     res.status(200).json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    console.error('Error deleting wallet:', error);
     res.status(500).json({ message: 'Error deleting wallet', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
//get a data from individual data
export const getWalletById = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user._id) {
       res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const userId = req.user?._id;
    const walletId = req.params.id;

    // Retrieve the wallet by ID and ensure it belongs to the user
    const wallet = await Wallet.findOne({ _id: walletId, userId }).populate('userId', 'username email');

    if (!wallet) {
      res.status(404).json({ message: 'Wallet not found' });
    }

     res.status(200).json({ message: 'Wallet retrieved successfully', wallet });
  } catch (error) {
    console.error('Error retrieving wallet:', error);
     res.status(500).json({ message: 'Error retrieving wallet', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};