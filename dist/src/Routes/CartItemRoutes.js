"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartItemcontroller_1 = require("../controllers/CartItemcontroller");
const router = express_1.default.Router();
router.post('/', CartItemcontroller_1.addToCart);
router.get('/', CartItemcontroller_1.getCartItems);
router.put('/:productId', CartItemcontroller_1.updateCartItem);
router.delete('/:productId', CartItemcontroller_1.deleteCartItem);
exports.default = router;
