import express from "express";
import jwtMiddleware from "../middleware/jwtMiddleware.js";

import {
	getProducts,
	getContracts,
	getRoyalties,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", jwtMiddleware, getProducts);
router.get("/contracts", jwtMiddleware, getContracts);
router.get("/royalties", jwtMiddleware, getRoyalties);

export default router;
