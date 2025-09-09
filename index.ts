import express from 'express';
import mongoose from 'mongoose';
import productRoutes from "./src/Routes/ProductRoutes";
import dotenv from "dotenv";
dotenv.config();

console.log("Loaded DB_URL:", process.env.DB_URL);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/products', productRoutes);

mongoose.connect(process.env.DB_URL || '', {})

  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => console.error('MongoDB connection error:', err));