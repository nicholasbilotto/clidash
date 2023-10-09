import express from "express";
import jwtMiddleware from "../middleware/jwtMiddleware.js";

import {
	getProducts,
	getContracts,
	getRoyalties,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/contracts", getContracts);
router.get("/royalties", getRoyalties);

export default router;
