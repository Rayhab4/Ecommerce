"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItem = exports.removeCartItem = exports.updateCartItem = exports.getCartItems = exports.addToCart = void 0;
const CartItemModel_1 = __importDefault(require("../Models/CartItemModel"));
const ProductModel_1 = __importDefault(require("../Models/ProductModel"));
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await ProductModel_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const cartItem = new CartItemModel_1.default({ productId, quantity });
        await cartItem.save();
        return res.status(201).json({
            success: true,
            data: cartItem,
            message: "Item added to cart",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.addToCart = addToCart;
const getCartItems = async (_req, res) => {
    try {
        const items = await CartItemModel_1.default.find().populate("productId");
        return res.status(200).json({ success: true, data: items });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCartItems = getCartItems;
const updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const item = await CartItemModel_1.default.findOneAndUpdate({ productId }, { quantity }, { new: true });
        if (!item) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }
        return res.status(200).json({
            success: true,
            data: item,
            message: "Cart item updated",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateCartItem = updateCartItem;
const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const item = await CartItemModel_1.default.findOneAndDelete({ productId });
        if (!item) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }
        return res.status(200).json({
            success: true,
            data: item,
            message: "Cart item removed",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.removeCartItem = removeCartItem;
const deleteCartItem = async (req, res) => {
    try {
        const deletedItem = await CartItemModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({ message: "Cart item deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteCartItem = deleteCartItem;
