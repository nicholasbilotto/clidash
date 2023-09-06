import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import path from "path";

import clientRoutes from "./routes/client.js";
import authRoutes from "./routes/auth.js";

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

import Product from "./models/Product.js";
import Contract from "./models/Contract.js";
import Royalty from "./models/Royalty.js";
import User from "./models/User.js";
import { dataProducts } from "./data/products.js";
import { dataContracts } from "./data/contracts.js";
import { dataArizent } from "./data/arizentroyalties.js";
import { dataUsers } from "./data/users.js";

/* USER HASH */

const hashAndSaveUsers = async () => {
	for (let i = 0; i < dataUsers.length; i++) {
		dataUsers[i].password = await bcrypt.hash(dataUsers[i].password, 10);
	}
	await User.insertMany(dataUsers);
};

/* Unmatched Routes handling */

// Serve static files from the React frontend app
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
	/* ROUTES */

	app.use("/client", clientRoutes);
	app.use("/auth", authRoutes);

	// Anything that doesn't match the above routes, send back the index.html file
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});
}

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT} active`));

		//to upload new data to database

		// Product.insertMany(dataProducts);
		// Contract.insertMany(dataContracts);
		// Royalty.insertMany(dataArizent);

		// await hashAndSaveUsers();
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB: ", error); // <-- Added this
	});
