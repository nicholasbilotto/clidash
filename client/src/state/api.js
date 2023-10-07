import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) {
				headers.set("x-auth-token", token);
			}
			return headers;
		},
	}),
	reducerPath: "adminApi",
	tagTypes: [
		"User",
		"Dashboard",
		"Products",
		"Contracts",
		"Royalties",
		"Users",
	],
	endpoints: (build) => ({
		getDashboard: build.query({
			query: () => "general/dashboard",
			providesTags: ["Dashboard"],
		}),
		getProductsCard: build.query({
			query: (page = 1, pageSize = 32) =>
				`client/products?page=${page}&pageSize=${pageSize}`,
			providesTags: ["Products"],
		}),
		getProductsTable: build.query({
			query: (params) => {
				const { page, pageSize, sort, filters } = params;

				// Construct URL with parameters
				const urlParams = new URLSearchParams();
				urlParams.append("page", page);
				urlParams.append("pageSize", pageSize);
				urlParams.append(
					"sort",
					typeof sort === "string" ? sort : JSON.stringify(sort)
				);

				// Add filters to URL parameters
				if (filters) {
					urlParams.append(
						"filters",
						typeof filters === "string"
							? filters
							: JSON.stringify(filters)
					);
				}

				return `client/products?${urlParams.toString()}`;
			},
			providesTags: ["Products"],
		}),
		getContracts: build.query({
			query: () => "client/contracts",
			providesTags: ["Contracts"],
		}),
		getRoyalties: build.query({
			query: () => "client/royalties",
			providesTags: ["Royalties"],
		}),
	}),
});

export const {
	useGetDashboardQuery,
	useGetProductsCardQuery,
	useGetProductsTableQuery,
	useGetContractsQuery,
	useGetRoyaltiesQuery,
} = api;

// getProductsTable: build.query({
// 	query: (params) => {
// 		console.log("API Request Params:", params);
// 		const query = new URLSearchParams({
// 			...params,
// 			sort:
// 				typeof params.sort === "string"
// 					? params.sort
// 					: JSON.stringify(params.sort),
// 		}).toString();
// 		return `client/products?${query}`;
// 	},
// 	providesTags: ["Products"],
// }),
