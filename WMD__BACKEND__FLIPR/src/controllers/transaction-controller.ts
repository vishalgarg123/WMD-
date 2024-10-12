// controllers/transaction.controller.ts
import { Request, Response } from 'express';
import Transaction, { ITransaction } from '../models/transaction-model';
import moment from 'moment';



// Get all transactions based on filtering and pagination
export const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { frequency, selectedDate, type, userId, page = 1, limit = 10 } = req.body;

    // Construct the query for the database
    const query: any = {
      userId, // Ensure you're filtering by user ID
      ...(type !== 'all' && { type }) // Include type filtering if it's not 'all'
    };

    // Date filtering based on frequency or selectedDate
    if (frequency !== 'custom') {
      query.date = { $gt: moment().subtract(Number(frequency), 'days').toDate() };
    } else if (selectedDate && selectedDate.length === 2) {
      query.date = {
        $gte: moment(selectedDate[0], 'DD/MM/YYYY').toDate(), // Start date
        $lte: moment(selectedDate[1], 'DD/MM/YYYY').toDate() // End date
      };
    }

    // Log the query for debugging
    console.log("Query Object:", query);

    // Pagination logic
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    // Fetch transactions with pagination
    const transactions = await Transaction.find(query)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    // Log the fetched transactions
    console.log("Fetched Transactions:", transactions);

    // Get the total count of transactions matching the query
    const totalTransactions = await Transaction.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalTransactions / limitNum);

    // Return response with transactions and pagination info
    res.status(200).json({
      transactions,
      pagination: {
        totalTransactions,
        totalPages,
        currentPage: pageNum,
        pageSize: limitNum
      }
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: 'An error occurred while fetching transactions.' });
  }
};


// Edit an existing transaction
export const editTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    await Transaction.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
    res.status(200).send('Transaction updated successfully!');
  } catch (error: unknown) {
    console.error('Error updating transaction:', error);
    res.status(500).json(error);
  }
};

// Add a new transaction
// Add a new transaction
export const addTransaction = async (req: Request, res: Response): Promise<void> => {
  const { userId, amount, date, category, notes, type } = req.body;

  try {
  
    const newTransaction: ITransaction = new Transaction({
      userId,
      amount,
      date, // Use the parsed date
      category,
      notes,
      type,
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction added successfully!', transaction: newTransaction });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error adding transaction :", err.message);
      res.status(500).send({ error: err.message });
    } else {
      console.error("Unexpected error:", err);
      res.status(500).send({ error: 'An error occurred during adding transaction' });
    }
  }
};



// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    await Transaction.findByIdAndDelete(req.body.transactionId);
    res.status(200).send('Transaction deleted successfully!');
  } catch (error: unknown) {
    console.error('Error deleting transaction:', error);
    res.status(500).json(error);
  }
};
