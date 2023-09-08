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

// export const getProducts = async (req, res) => {
// 	try {
// 		const { page = 1, pageSize = 100, sort = {} } = req.query;

// 		// Convert page and pageSize to numbers
// 		const pageNum = Number(page);
// 		const pageSizeNum = Number(pageSize);

// 		// Calculate the number of documents to skip
// 		const skip = (pageNum - 1) * pageSizeNum;

// 		// Fetch the products with pagination and sorting
// 		const products = await Product.find()
// 			.sort(sort)
// 			.skip(skip)
// 			.limit(pageSizeNum);

// 		// Count the total number of products
// 		const total = await Product.countDocuments();

// 		// Send back the products and the total count
// 		res.status(200).json({ docs: products, totalDocs: total });
// 	} catch (error) {
// 		console.error("Error in Get Products", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };

export const getProducts = async (req, res) => {
	console.log("Received query params:", req.query);

	try {
		const { page = 1, pageSize = 100, sort = {}, filters = {} } = req.query;
		console.log("FILTERSSSS", filters);

		// Convert page and pageSize to numbers
		const pageNum = Number(page);
		const pageSizeNum = Number(pageSize);

		// Calculate the number of documents to skip
		const skip = (pageNum - 1) * pageSizeNum;

		// Construct the query based on filters
		// let query = {};
		// filterModel.forEach((filter) => {
		// 	query[filter.field] = filter.value; // This is simplified; you might need more complex logic here
		// });

		// Fetch the products with pagination, sorting, and filtering
		const products = await Product.find(filters)
			.sort(sort)
			.skip(skip)
			.limit(pageSizeNum);

		// Count the total number of products that match the filters
		const total = await Product.countDocuments(query);

		// Send back the products and the total count
		res.status(200).json({ docs: products, totalDocs: total });
	} catch (error) {
		console.error("Error in Get Products", error);
		res.status(500).json({ message: error.message });
	}
};

// export const getProducts = async (req, res) => {
// 	console.log("Received query params:", req.query);

// 	try {
// 		const { page = 1, pageSize = 100, sort = {}, filters = "{}" } = req.query;
// 		let parsedFilters = JSON.parse(filters);

// 		// Convert the parsedFilters into MongoDB-friendly queries
// 		const mongoFilters = {};
// 		if (Array.isArray(parsedFilters)) {
// 			parsedFilters.forEach((filter) => {
// 				if (filter.operator === "contains") {
// 					mongoFilters[filter.field] = {
// 						$regex: new RegExp(filter.value, "i"),
// 					};
// 				}
// 				// Add more conditions here based on the operators you'll support
// 			});
// 		}

// 		// Convert page and pageSize to numbers
// 		const pageNum = Number(page);
// 		const pageSizeNum = Number(pageSize);

// 		// Calculate the number of documents to skip
// 		const skip = (pageNum - 1) * pageSizeNum;

// 		// Fetch the products with pagination, sorting, and filtering
// 		const products = await Product.find(mongoFilters)
// 			.sort(sort)
// 			.skip(skip)
// 			.limit(pageSizeNum);

// 		// Count the total number of products that match the filters
// 		const total = await Product.countDocuments(mongoFilters);

// 		// Send back the products and the total count
// 		res.status(200).json({ docs: products, totalDocs: total });
// 	} catch (error) {
// 		console.error("Error in Get Products", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };
