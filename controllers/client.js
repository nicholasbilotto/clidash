import Product from "../models/Product.js";
import Contract from "../models/Contract.js";
import Royalty from "../models/Royalty.js";

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
	console.log("Received query params:", req.query);

	try {
		const {
			page = 1,
			pageSize = 100,
			sort = {},
			field,
			operator,
			value,
		} = req.query;

		// Convert page and pageSize to numbers
		const pageNum = Number(page);
		const pageSizeNum = Number(pageSize);

		// Calculate the number of documents to skip
		const skip = (pageNum - 1) * pageSizeNum;

		// Initialize the query object
		let query = {};

		// Add field and value to the query if provided
		if (field && operator && value) {
			switch (operator) {
				case "equals":
					query[field] = value;
					break;
				case "contains":
					query[field] = { $regex: value, $options: "i" };
					break;
				// Add more cases based on your needs
				default:
					break;
			}
		}

		let parsedSort = {};
		try {
			parsedSort = JSON.parse(decodeURIComponent(sort));
		} catch (e) {
			console.error("Error parsing sort parameter", e);
		}
		console.log("Parsed Sort Parameters:", parsedSort);

		// Fetch the products with pagination, sorting, and filtering
		const products = await Product.find(query)
			.sort(parsedSort)
			.skip(skip)
			.limit(pageSizeNum);

		console.log("Fetched Products:", products);

		// Count the total number of filtered products
		const total = await Product.countDocuments(query);

		// Send back the products and the total count
		res.status(200).json({ docs: products, totalDocs: total });
	} catch (error) {
		console.error("Error in Get Products", error);
		res.status(500).json({ message: error.message });
	}
};
