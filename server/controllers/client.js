import Productold from "../models/Productold.js";
import ProductStat from "../models/ProductStat.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Contract from "../models/Contract.js";
import Royalty from "../models/Royalty.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProductsold = async (req, res) => {
	try {
		const productsold = await Productold.find();

		const productsWithStats = await Promise.all(
			products.map(async (product) => {
				const stat = await ProductStat.find({
					productId: product._id,
				});
				return {
					...product._doc,
					stat,
				};
			})
		);
		res.status(200).json(productsWithStats);
	} catch (error) {
		console.error("Error in getProducts: ", error); // <-- Added this
		res.status(500).json({ message: error.message });
	}
};

export const getContracts = async (req, res) => {
	try {
		const contract = await Contract.find();
		res.status(200).json(contract);
	} catch (error) {
		console.log("error in get contracts", error);
		res.status(500).json({ message: error.message });
	}
};

export const getRoyalties = async (req, res) => {
	{
		try {
			const royalty = await Royalty.find();
			res.status(200).json(royalty);
		} catch (error) {
			console.log("error in get royalties", error);
			res.status(500).json({ message: error.message });
		}
	}
};

export const getProducts = async (req, res) => {
	try {
		const { page = 1, pageSize = 100, sort = {} } = req.query;

		// Convert page and pageSize to numbers
		const pageNum = Number(page);
		const pageSizeNum = Number(pageSize);

		// Calculate the number of documents to skip
		const skip = (pageNum - 1) * pageSizeNum;

		// Fetch the products with pagination and sorting
		const products = await Product.find()
			.sort(sort)
			.skip(skip)
			.limit(pageSizeNum);

		// Count the total number of products
		const total = await Product.countDocuments();

		// Send back the products and the total count
		res.status(200).json({ docs: products, totalDocs: total });
	} catch (error) {
		console.error("Error in Get Products", error);
		res.status(500).json({ message: error.message });
	}
};

export const getCustomers = async (req, res) => {
	try {
		const customers = await User.find({ role: "user" }).select("-password");
		res.status(200).json(customers);
	} catch (error) {
		console.error("Error in getCustomers: ", error); // <-- Added this
		res.status(500).json({ message: error.message });
	}
};

export const getTransactions = async (req, res) => {
	try {
		// sort should look like this: { "field": "userId", "sort": "desc" }
		const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

		//formatted sort should look like { userId: -1 }
		const generateSort = () => {
			const sortParsed = JSON.parse(sort);
			const sortFormatted = {
				[sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
			};

			return sortFormatted;
		};
		const sortFormatted = Boolean(sort) ? generateSort() : {};

		const transactions = await Transaction.find({
			$or: [
				{ cost: { $regex: new RegExp(search, "i") } },
				{ userId: { $regex: new RegExp(search, "i") } },
			],
		})
			.sort(sortFormatted)
			.skip(page * pageSize)
			.limit(pageSize);

		const total = await Transaction.countDocuments({
			name: { $regex: search, $options: "i" },
		});

		res.status(200).json({
			transactions,
			total,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getGeography = async (req, res) => {
	try {
		const users = await User.find();

		const mappedLocations = users.reduce((acc, { country }) => {
			const countryISO3 = getCountryIso3(country);
			if (!acc[countryISO3]) {
				acc[countryISO3] = 0;
			}
			acc[countryISO3]++;
			return acc;
		}, {});

		const formattedLocations = Object.entries(mappedLocations).map(
			([country, count]) => {
				return { id: country, value: count };
			}
		);

		res.status(200).json(formattedLocations);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
