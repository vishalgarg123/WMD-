import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import userModel, { IUser } from '../models/user-model';
//this module help  to send otp of user
// import nodemailer,{Transporter} from 'nodemailer';
// this module helps bcrypt{random letter generate} the password
import bcrypt from 'bcrypt';
// this module genrate random token for verification of user
// import dotenv from "dotenv"
// dotenv.config()

// Index Page Controller
export const indexPageController = (req: Request, res: Response): void => {
    res.send("Hello from index");
};



// Register Controller
export const registerController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Check for existing email
        if (!email || !password || !username) {
            res.status(400).send({ error: 'All fields are required' });
            return;
        }

        let user: IUser | null = await userModel.findOne({ email });

        // Check for existing user
        if (user) {
            res.status(400).send({ error: 'Email already exists' });
            return;
        }

        // Create new user instance
        user = new userModel({
            username, // Include username if required
            email,
            password, // Password will be set after hashing
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
       

        // Save the user
        await user.save();
        // if (!process.env.JWT_KEY) {
        //     throw new Error('JWT_KEY is not defined in the environment variables');
        // }


        // // Generate JWT token
        // const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY as string);
        // res.cookie("token", token, { httpOnly: true }); // Set token as an HTTP-only cookie

        res.status(201).send({ message: 'User registered successfully' ,user});
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error in registration:", err.message);
            res.status(500).send({ error: err.message });
        } else {
            console.error("Unexpected error:", err);
            res.status(500).send({ error: 'An error occurred during registration' });
        }
    }
};



// Login Controller
export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
          res.status(400).send({ error: 'All fields are required' });
          return;
      }

      // Find user by email
      const user: IUser | null = await userModel.findOne({ email }).select("+password");
      if (!user) {
          res.status(404).send({ error: 'User not found. Please check your email.' });
          return;
      }
         // Ensure user.password is defined and a string
         if (!user.password || typeof user.password !== 'string') {
          res.status(500).send({ error: 'Password not found or is invalid' });
          return;
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          res.status(401).send({ error: 'Password is incorrect' });
          return;
      }

      // Check if JWT_KEY is defined
      const jwtKey = process.env.JWT_KEY;
      if (!jwtKey) {
          res.status(500).send({ error: 'JWT key is not defined. Please check your environment variables.' });
          return;
      }

      // Generate JWT token
      const token = jwt.sign({ email, id: user._id }, jwtKey, { expiresIn: "12h" });
      res.cookie("token", token, { httpOnly: true }); // Set the cookie

      // Send response
      res.status(200).send({
          message: 'Login successful',
          token: token // Include the token in the response
      });
  } catch (err: unknown) {
      if (err instanceof Error) {
          console.error("Error in login:", err.message);
          res.status(500).send({ error: 'An error occurred during login: ' + err.message });
      } else {
          console.error("Unexpected error:", err);
          res.status(500).send({ error: 'An unexpected error occurred during login' });
      }
  }
}

// Logout Controller
export const logoutController = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: 'Logout successful' });
    }
    catch (err: unknown) {
      if (err instanceof Error) {
          console.error("Error in registration Verification  :", err.message);
          res.status(500).send({ error: err.message });
      } else {
          console.error("Unexpected error:", err);
          res.status(500).send({ error: 'An  error occurred during verification' });
      }
};
}



// Reset Password Controller
export const resetPasswordController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, newPassword } = req.body;
     //check the required password
        if (!email || !newPassword) {
            res.status(400).send({ error: 'Email and new password are required' });
            return;
        }
     //check the exsting user
        const user: IUser | null = await userModel.findOne({ email }).select('+password');
        if (!user) {
            res.status(404).send({ error: 'User not found' });
            return;
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    
        await user.save();

        res.status(200).send({ message: 'Password reset successfully' });
      }
   
    catch (err: unknown) {
      if (err instanceof Error) {
          console.error("Error in forget controller  :", err.message);
          res.status(500).send({ error: err.message });
      } else {
          console.error("Unexpected error:", err);
          res.status(500).send({ error: 'An  error occurred during password reset' });
      }
    }
};
