import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import productRoutes from "./src/Routes/ProductRoutes";
import orderRoutes from "./src/Routes/OrderRoutes";
import cartitemRoutes from "./src/Routes/CartItemRoutes";
import authRoutes from "./src/Routes/AuthRoutes";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"; 

dotenv.config();

console.log("Loaded DB_URL:", process.env.DB_URL);

const app = express();
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartitemRoutes);
app.use('/api/auth', authRoutes);

app.get("/", (req: Request, res: Response) =>{
  res.json({"message": "Byakunze we", "status": "200"});
});

mongoose.connect(process.env.DB_URL || '', {})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => console.error('MongoDB connection error:', err));
