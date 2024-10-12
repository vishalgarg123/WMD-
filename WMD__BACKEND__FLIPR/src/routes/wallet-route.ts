import express from "express"
import {createWallet,editWallet,deleteWallet, getWalletById
} from "../controllers/wallet-controller"
import {verifyToken} from "../middlewares/user-middleware"
const router=express.Router()

/* Route to add a transaction
POST : /api/wallets */
router.post('/', verifyToken,createWallet);

/* Route to edit a transaction
PUT : /api/wallets/:walletId */
router.put('/:walletId',verifyToken,editWallet);

/* Route to delete a transaction
 DELETE :/api/wallets/:walletId */
router.delete('/:walletId',verifyToken,deleteWallet);



/* Route to get wallet of individually  
GET :/api/wallets/:walletId */
router.get('/walletId',verifyToken, getWalletById);

export default router;