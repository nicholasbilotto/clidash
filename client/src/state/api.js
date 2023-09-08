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
		// getProductsTable: build.query({
		// 	query: (params) => {
		// 		const query = new URLSearchParams(params).toString();
		// 		return `client/products?${query}`;
		// 	},
		// 	providesTags: ["Products"],
		// }),
		getProductsTable: build.query({
			query: (params) => {
				const { page, pageSize, filters } = params;
				const queryParams = new URLSearchParams({
					page,
					pageSize,
					filters: JSON.stringify(filters), // Stringify the filter array here
				});
				return `client/products?${queryParams.toString()}`;
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
