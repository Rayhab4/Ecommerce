"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Ordercontroller_1 = require("../controllers/Ordercontroller");
const router = (0, express_1.Router)();
router.post("/", Ordercontroller_1.placeOrder); // POST /orders
router.get("/", Ordercontroller_1.getAllOrders); // GET /orders
router.get("/:id", Ordercontroller_1.getOrderById); // GET /orders/:id
router.delete("/:id", Ordercontroller_1.cancelOrder); // DELETE /orders/:id
exports.default = router;
