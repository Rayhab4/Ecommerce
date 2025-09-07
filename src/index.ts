import express from 'express';
import mongoose from 'mongoose';
import productRoutes from "./Routes/ProductRoutes";
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/products', productRoutes);

mongoose.connect(process.env.MONGO_URI || '', { })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
