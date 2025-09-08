import express,{ Request, Response } from "express";
import CartItem from "../Models/CartItemModel";
import Product from "../Models/ProductModel";

export interface CartItemInput {
  productId: string;
  quantity: number;
}
export const addToCart = async (
  req: Request<{}, {}, CartItemInput>,
  res: Response
) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const cartItem = new CartItem({ productId, quantity });
    await cartItem.save();

    return res.status(201).json({
      success: true,
      data: cartItem,
      message: "Item added to cart",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCartItems = async (_req: Request, res: Response) => {
  try {
    const items = await CartItem.find().populate("productId");
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (
  req: Request<{ productId: string }, {}, { quantity: number }>,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findOneAndUpdate(
      { productId },
      { quantity },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    return res.status(200).json({
      success: true,
      data: item,
      message: "Cart item updated",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCartItem = async (
  req: Request<{ productId: string }>,
  res: Response
) => {
  try {
    const { productId } = req.params;

    const item = await CartItem.findOneAndDelete({ productId });
    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    return res.status(200).json({
      success: true,
      data: item,
      message: "Cart item removed",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
