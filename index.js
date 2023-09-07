import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import clientRoutes from "./routes/client.js";
import authRoutes from "./routes/auth.js";

/* configurations */

dotenv.config();
const app = express();
app.use(express.json());
// Commenting out helmet for now to debug
// app.use(helmet());
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             frameSrc: ["'self'", "https://airtable.com"],
//             // Add other directives as needed
//         },
//     })
// );
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Using specific CORS settings
const corsOptions = {
	origin: "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// data imports

import Product from "./models/Product.js";
import Contract from "./models/Contract.js";
import Royalty from "./models/Royalty.js";
import User from "./models/User.js";
import { dataProducts } from "./data/products.js";
import { dataContracts } from "./data/contracts.js";
import { dataArizent } from "./data/arizentroyalties.js";
import { dataUsers } from "./data/users.js";

// USER HASH

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hashAndSaveUsers = async () => {
	for (let i = 0; i < dataUsers.length; i++) {
		dataUsers[i].password = await bcrypt.hash(dataUsers[i].password, 10);
	}
	await User.insertMany(dataUsers);
};

// Serve static files from the React frontend app
app.use("/client", clientRoutes);
app.use("/auth", authRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build/index.html"));
});

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT} active`));

		// Uncomment these lines if you need to upload new data to the database
		// Product.insertMany(dataProducts);
		// Contract.insertMany(dataContracts);
		// Royalty.insertMany(dataArizent);
		// await hashAndSaveUsers();
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB: ", error);
	});
