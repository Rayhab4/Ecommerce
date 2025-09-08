"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Productcontroller_1 = require("../controllers/Productcontroller");
const router = express_1.default.Router();
router.post('/', Productcontroller_1.createProduct);
router.get('/', Productcontroller_1.getAllProducts);
router.get('/:id', Productcontroller_1.getProductById);
router.put('/:id', Productcontroller_1.updateProduct);
router.delete('/:id', Productcontroller_1.deleteProduct);
exports.default = router;
