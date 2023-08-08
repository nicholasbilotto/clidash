import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* configurations */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//data imports

import User from "./models/User.js";
import Product from "./models/Product.js";
import Contract from "./models/Contract.js";
import Royalty from "./models/Royalty.js";
import { dataProducts } from "./data/products.js";
import { dataContracts } from "./data/contracts.js";
import { dataArizent } from "./data/arizentroyalties.js";
import {
	dataUser,
	dataProduct,
	dataProductStat,
	dataTransaction,
	dataOverallStat,
	dataAffiliateStat,
} from "./data/index.js";

/* ROUTES */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT} active`));

		//to upload new data to database
		// Product.insertMany(dataProducts);
		// Contract.insertMany(dataContracts);
		// Royalty.insertMany(dataArizent);
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB: ", error); // <-- Added this
	});
