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
