import express,{ Request, Response } from "express";
import CartItem from "../Models/CartItemModel";
import Product from "../Models/ProductModel";
import Order from "../Models/OrderModel";
import { ApiResponse } from "../types";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.find();
    if (!cartItems.length) {
      return res.status(400).json({ success: false, data: null, message: "Cart is empty" });
    }

    const orderItems = [] as any[];
    let total = 0;

    for (const ci of cartItems) {
      const product = await Product.findById(ci.productId);
      if (!product) {
        return res.status(400).json({ success: false, data: null, message: `Product ${ci.productId} not found` });
      }
      const priceAtPurchase = product.price;
      const lineTotal = priceAtPurchase * ci.quantity;
      total += lineTotal;
      orderItems.push({ productId: product._id, quantity: ci.quantity, priceAtPurchase });
    }

    const order = await Order.create({ items: orderItems, totalPrice: total });

    // clear cart after placing order
    await CartItem.deleteMany({});

    return res.status(201).json({ success: true, data: order });
  } catch (err: any) {
    return res.status(500).json({ success: false, data: null, message: err.message });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("items.productId");
    return res.status(200).json({ success: true, data: orders });
  } catch (err: any) {
    return res.status(500).json({ success: false, data: null, message: err.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id).populate("items.productId");
    if (!order) {
      return res.status(404).json({ success: false, data: null, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (err: any) {
    return res.status(500).json({ success: false, data: null, message: err.message });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ success: false, data: null, message: "Order not found" });
    }
    return res.status(200).json({ success: true, data: order, message: "Canceled" });
  } catch (err: any) {
    return res.status(500).json({ success: false, data: null, message: err.message });
  }
};
