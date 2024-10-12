// Import necessary modules from mongoose
import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the User document that extends Mongoose Document
export interface IUser extends Document {
    username?: string; // Optional field for the username
    email: string; // Required field for the email
    password?: string; // Optional field for the password
   
}

// Create the User schema, specifying the structure of user documents
const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String, // The type of the username field
        required: false, // Not required during registration
    },
    email: {
        type: String, // The type of the email field
        required: true, // Required field
        unique: true, // Ensures no two users can have the same email
    },
    password: {
        type: String, // The type of the password field
        required: false, // Optional field; can be added later
    },
   
});

// Create the User model based on the schema
const UserModel = mongoose.model<IUser>('User', userSchema);

// Export the User model to use it in other parts of the application
export default UserModel;
