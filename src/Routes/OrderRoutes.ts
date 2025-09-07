import express, { Router } from "express";
import { placeOrder, getAllOrders, getOrderById, cancelOrder } from "../controllers/Ordercontroller";

const router = Router();

router.post("/", placeOrder);        // POST /orders
router.get("/", getAllOrders);       // GET /orders
router.get("/:id", getOrderById);    // GET /orders/:id
router.delete("/:id", cancelOrder);  // DELETE /orders/:id

export default router;