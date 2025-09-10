import { Request, Response } from 'express';
import { hashPassword, comparePasswords } from '../utils/auth';
import { generateToken } from '../utils/jwt';
import UserModel from '../Models/UserModel';

export interface User {
  name: string;
  email: string;
  password: string;
}


export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: { email: string, password: string } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id.toString()); // Generate token with user ID

    return res.status(200).json({
      message: 'Login successful',
      token, // Send the token in response
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password); // Hash the password

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Save the new user to the database

    const token = generateToken(newUser._id.toString()); // Generate a token for the user

    return res.status(201).json({
      message: 'Registration successful',
      token, // Send the token in response
    });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error });
  }
};
