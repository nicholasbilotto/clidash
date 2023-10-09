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
		const { page = 1, pageSize = 100, sort, filters } = req.query;

		// Convert page and pageSize to numbers
		const pageNum = Number(page);
		const pageSizeNum = Number(pageSize);

		// Calculate the number of documents to skip
		const skip = (pageNum - 1) * pageSizeNum;

		// Decode and then parse sort and filters parameters
		let parsedSort = {};
		let parsedFilters = {};

		if (sort) {
			try {
				const decodedSort = JSON.parse(decodeURIComponent(sort));
				parsedSort[decodedSort.field] = decodedSort.order;
			} catch (e) {
				console.error("Error parsing sort parameter", e);
			}
		}

		if (filters) {
			try {
				parsedFilters = JSON.parse(decodeURIComponent(filters));
			} catch (e) {
				console.error("Error parsing filters parameter", e);
			}
		}

		console.log("Parsed Sort Parameters:", parsedSort);
		console.log("Parsed Filter Parameters:", parsedFilters);

		// Initialize the query object
		let query = {};
		let orQueries = [];
		let andQueries = [];
		Object.keys(parsedFilters).forEach((field) => {
			const filter = parsedFilters[field];
			filter.constraints.forEach((constraint) => {
				let fieldQuery;
				switch (constraint.matchMode) {
					case "startsWith":
						fieldQuery = {
							[field]: { $regex: `^${constraint.value}`, $options: "i" },
						};
						break;
					case "contains":
						fieldQuery = {
							[field]: { $regex: constraint.value, $options: "i" },
						};
						break;
					case "notContains":
						fieldQuery = {
							[field]: {
								$not: { $regex: constraint.value, $options: "i" },
							},
						};
						break;
					case "endsWith":
						fieldQuery = {
							[field]: { $regex: `${constraint.value}$`, $options: "i" },
						};
						break;
					case "equals":
						fieldQuery = { [field]: constraint.value };
						break;
					case "notEquals":
						fieldQuery = { [field]: { $ne: constraint.value } };
						break;
					default:
						break;
				}
				if (filter.operator === "or") {
					orQueries.push(fieldQuery);
				} else {
					andQueries.push(fieldQuery);
				}
			});
		});

		if (orQueries.length > 0) {
			query.$or = orQueries;
		}
		if (andQueries.length > 0) {
			query.$and = andQueries;
		}

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

// export const getProducts = async (req, res) => {
// 	console.log("Received query params:", req.query);

// 	try {
// 		const { page = 1, pageSize = 100, sort, filters } = req.query;

// 		// Convert page and pageSize to numbers
// 		const pageNum = Number(page);
// 		const pageSizeNum = Number(pageSize);

// 		// Calculate the number of documents to skip
// 		const skip = (pageNum - 1) * pageSizeNum;

// 		// Decode and then parse sort and filters parameters
// 		let parsedSort = {};
// 		let parsedFilters = {};

// 		if (sort) {
// 			try {
// 				const decodedSort = JSON.parse(decodeURIComponent(sort));
// 				parsedSort[decodedSort.field] = decodedSort.order;
// 			} catch (e) {
// 				console.error("Error parsing sort parameter", e);
// 			}
// 		}

// 		if (filters) {
// 			try {
// 				parsedFilters = JSON.parse(decodeURIComponent(filters));
// 			} catch (e) {
// 				console.error("Error parsing filters parameter", e);
// 			}
// 		}

// 		console.log("Parsed Sort Parameters:", parsedSort);
// 		console.log("Parsed Filter Parameters:", parsedFilters);

// 		// Initialize the query object
// 		let query = {};
// 		let orQueries = [];
// 		Object.keys(parsedFilters).forEach((field) => {
// 			const filter = parsedFilters[field];
// 			let fieldQuery;
// 			switch (filter.criterion) {
// 				case "startsWith":
// 					fieldQuery = {
// 						[field]: { $regex: `^${filter.value}`, $options: "i" },
// 					};
// 					break;
// 				case "contains":
// 					fieldQuery = {
// 						[field]: { $regex: filter.value, $options: "i" },
// 					};
// 					break;
// 				case "notContains":
// 					fieldQuery = {
// 						[field]: { $not: { $regex: filter.value, $options: "i" } },
// 					};
// 					break;
// 				case "endsWith":
// 					fieldQuery = {
// 						[field]: { $regex: `${filter.value}$`, $options: "i" },
// 					};
// 					break;
// 				case "equals":
// 					fieldQuery = { [field]: filter.value };
// 					break;
// 				case "notEquals":
// 					fieldQuery = { [field]: { $ne: filter.value } };
// 					break;
// 				default:
// 					break;
// 			}
// 			if (filter.matchMode === "any") {
// 				orQueries.push(fieldQuery);
// 			} else {
// 				// Assume 'all' as default matchMode
// 				Object.assign(query, fieldQuery);
// 			}
// 		});

// 		if (orQueries.length > 0) {
// 			query = { $or: orQueries };
// 		}

// 		// Fetch the products with pagination, sorting, and filtering
// 		const products = await Product.find(query)
// 			.sort(parsedSort)
// 			.skip(skip)
// 			.limit(pageSizeNum);

// 		console.log("Fetched Products:", products);

// 		// Count the total number of filtered products
// 		const total = await Product.countDocuments(query);

// 		// Send back the products and the total count
// 		res.status(200).json({ docs: products, totalDocs: total });
// 	} catch (error) {
// 		console.error("Error in Get Products", error);
// 		res.status(500).json({ message: error.message });
// 	}
// };
