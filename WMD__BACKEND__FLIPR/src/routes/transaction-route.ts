import express from "express"
import {addTransaction,getAllTransactions,deleteTransaction,editTransaction
} from "../controllers/transaction-controller"
import {verifyToken} from "../middlewares/user-middleware"
const router=express.Router()

/* Route to add a transaction
POST : /api/transactions */
router.post('/',verifyToken,addTransaction);

/* Route to edit a transaction
PUT : /api/transactions/:transactionId */
router.put('/',verifyToken, editTransaction);

/* Route to delete a transaction
 DELETE :/api/transactions/:transactionId */
router.delete('/',verifyToken,deleteTransaction);

/* // Route to get all transactions for a user with pagination
router.get('/user/:userId', getTransactions); */

/* Route to get all transactions with pagination 
GET :/api/transactions */
router.get('/',verifyToken, getAllTransactions);

export default router;
