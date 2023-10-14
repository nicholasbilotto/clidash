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
			sort,
			filters,
			globalFilter,
		} = req.query;

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

		// Initialize the query object
		let query = {};

		Object.keys(parsedFilters).forEach((field) => {
			const filter = parsedFilters[field];
			let fieldQuery;
			switch (filter.matchMode) {
				case "startsWith":
					fieldQuery = {
						[field]: { $regex: `^${filter.value}`, $options: "i" },
					};
					break;
				case "contains":
					fieldQuery = {
						[field]: { $regex: filter.value, $options: "i" },
					};
					break;
				case "notContains":
					fieldQuery = {
						[field]: { $not: { $regex: filter.value, $options: "i" } },
					};
					break;
				case "endsWith":
					fieldQuery = {
						[field]: { $regex: `${filter.value}$`, $options: "i" },
					};
					break;
				case "equals":
					fieldQuery = { [field]: filter.value };
					break;
				case "notEquals":
					fieldQuery = { [field]: { $ne: filter.value } };
					break;
				case "in":
					fieldQuery = { [field]: { $in: filter.value } };
					break;
				default:
					break;
			}
			// Merge the field query into the main query using $and
			query = {
				$and: [...(query.$and || []), fieldQuery],
			};
		});

		if (globalFilter) {
			const regex = new RegExp(globalFilter, "i"); // case-insensitive regex
			const globalQuery = {
				$or: [
					{ Client: { $regex: regex } },
					{ Category: { $regex: regex } },
					{ ProductName: { $regex: regex } },
					// ...add other fields as needed
				],
			};

			// Merge the globalQuery into the main query using $and
			query = {
				$and: [...(query.$and || []), globalQuery],
			};
		}

		// Fetch the products with pagination, sorting, and filtering
		const products = await Product.find(query)
			.sort(parsedSort)
			.skip(skip)
			.limit(pageSizeNum);

		// Count the total number of filtered products
		const total = await Product.countDocuments(query);

		// Send back the products and the total count
		res.status(200).json({ docs: products, totalDocs: total });
	} catch (error) {
		console.error("Error in Get Products", error);
		res.status(500).json({ message: error.message });
	}
};

export const exportFilteredProducts = async (req, res) => {
	try {
		const { sort, filters, globalFilter } = req.query;

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

		// Initialize the query object
		let query = {};

		Object.keys(parsedFilters).forEach((field) => {
			const filter = parsedFilters[field];
			let fieldQuery;
			switch (filter.matchMode) {
				case "startsWith":
					fieldQuery = {
						[field]: { $regex: `^${filter.value}`, $options: "i" },
					};
					break;
				case "contains":
					fieldQuery = {
						[field]: { $regex: filter.value, $options: "i" },
					};
					break;
				case "notContains":
					fieldQuery = {
						[field]: { $not: { $regex: filter.value, $options: "i" } },
					};
					break;
				case "endsWith":
					fieldQuery = {
						[field]: { $regex: `${filter.value}$`, $options: "i" },
					};
					break;
				case "equals":
					fieldQuery = { [field]: filter.value };
					break;
				case "notEquals":
					fieldQuery = { [field]: { $ne: filter.value } };
					break;
				default:
					break;
			}
			// Merge the field query into the main query using $and
			query = {
				$and: [...(query.$and || []), fieldQuery],
			};
		});

		if (globalFilter) {
			const regex = new RegExp(globalFilter, "i"); // case-insensitive regex
			const globalQuery = {
				$or: [
					{ Client: { $regex: regex } },
					{ Category: { $regex: regex } },
					{ ProductName: { $regex: regex } },
					// ...add other fields as needed
				],
			};

			// Merge the globalQuery into the main query using $and
			query = {
				$and: [...(query.$and || []), globalQuery],
			};
		}

		// Fetch all the products with sorting and filtering, but without pagination
		const products = await Product.find(query).sort(parsedSort);

		// Send back the products
		res.status(200).json({ docs: products });
	} catch (error) {
		console.error("Error in Export Filtered Products", error);
		res.status(500).json({ message: error.message });
	}
};
