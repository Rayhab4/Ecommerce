"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.getOrderById = exports.getAllOrders = exports.placeOrder = void 0;
const CartItemModel_1 = __importDefault(require("../Models/CartItemModel"));
const ProductModel_1 = __importDefault(require("../Models/ProductModel"));
const OrderModel_1 = __importDefault(require("../Models/OrderModel"));
const placeOrder = async (req, res) => {
    try {
        const cartItems = await CartItemModel_1.default.find();
        if (!cartItems.length) {
            return res.status(400).json({ success: false, data: null, message: "Cart is empty" });
        }
        const orderItems = [];
        let total = 0;
        for (const ci of cartItems) {
            const product = await ProductModel_1.default.findById(ci.productId);
            if (!product) {
                return res.status(400).json({ success: false, data: null, message: `Product ${ci.productId} not found` });
            }
            const priceAtPurchase = product.price;
            const lineTotal = priceAtPurchase * ci.quantity;
            total += lineTotal;
            orderItems.push({ productId: product._id, quantity: ci.quantity, priceAtPurchase });
        }
        const order = await OrderModel_1.default.create({ items: orderItems, totalPrice: total });
        // clear cart after placing order
        await CartItemModel_1.default.deleteMany({});
        return res.status(201).json({ success: true, data: order });
    }
    catch (err) {
        return res.status(500).json({ success: false, data: null, message: err.message });
    }
};
exports.placeOrder = placeOrder;
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel_1.default.find().populate("items.productId");
        return res.status(200).json({ success: true, data: orders });
    }
    catch (err) {
        return res.status(500).json({ success: false, data: null, message: err.message });
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await OrderModel_1.default.findById(id).populate("items.productId");
        if (!order) {
            return res.status(404).json({ success: false, data: null, message: "Order not found" });
        }
        return res.status(200).json({ success: true, data: order });
    }
    catch (err) {
        return res.status(500).json({ success: false, data: null, message: err.message });
    }
};
exports.getOrderById = getOrderById;
const cancelOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await OrderModel_1.default.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ success: false, data: null, message: "Order not found" });
        }
        return res.status(200).json({ success: true, data: order, message: "Canceled" });
    }
    catch (err) {
        return res.status(500).json({ success: false, data: null, message: err.message });
    }
};
exports.cancelOrder = cancelOrder;
