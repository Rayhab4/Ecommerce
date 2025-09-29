import { Request, Response } from 'express';
import { hashPassword, comparePasswords } from '../utils/auth';
import { generateToken } from '../utils/jwt';
import UserModel from '../Models/UserModel';

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}


export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: { email: string, password: string, role: string } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id.toString()); 

    return res.status(200).json({
      message: 'Login successful',
      role: user.role,
      token, 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, role }: { name: string, email: string, password: string, role: string } = req.body;

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
      role,
    });

    await newUser.save(); // Save the new user to the database

    const token = generateToken(newUser._id.toString()); // Generate a token for the user

    return res.status(201).json({
      message: 'Registration successful',
      role: newUser.role,
      token, // Send the token in response
    });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error });
  }
};
