import express, { Router } from "express";
import { placeOrder, getAllOrders, getOrderById, cancelOrder } from "../controllers/Ordercontroller";
import { authMiddleware } from '../middlewares/Authmiddlewares';


const router = Router();

router.post("/", authMiddleware, placeOrder);      
router.get("/", authMiddleware, getAllOrders);     
router.get("/:id", authMiddleware, getOrderById);  
router.delete("/:id", authMiddleware, cancelOrder);

export default router;