import express, { Request, Response, NextFunction } from 'express';
import {
  indexPageController,
  registerController,
  // registrationVerification,
  loginController,
  logoutController,
  // forgotPasswordController,
  resetPasswordController,
  // verifyOtpController
} from '../controllers/user-controller';

const router = express.Router();

// Route Handlers
router.get('/', indexPageController);

/* 
  POST : /api/auth/register
  This API is used for user registration.
*/
router.post('/register', registerController);



/* 
  POST : /api/auth/login
  This API is used for user login.
*/
router.post('/login', loginController);

/* 
  GET : /api/auth/logout
  This API is used for user logout.
*/
router.get('/logout', logoutController);



/* 
  POST : /api/auth/reset-password
  This API is used to reset the password.
*/
router.post('/reset-password', resetPasswordController);

// Export the router
export default router;

