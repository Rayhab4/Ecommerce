import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../controllers/CartItemcontroller";

const router = express.Router();

router.post('/', addToCart);
router.get('/', getCartItems);
router.put('/:productId', updateCartItem);
router.delete('/:productId', deleteCartItem);

export default router;
