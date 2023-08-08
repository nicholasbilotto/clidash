import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
	reducerPath: "adminApi",
	tagTypes: ["User", "Dashboard", "Products", "Contracts", "Royalties"],
	endpoints: (build) => ({
		getUser: build.query({
			query: (id) => `general/user/${id}`,
			providesTags: ["User"],
		}),
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
				const query = new URLSearchParams(params).toString();
				return `client/products?${query}`;
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

// make sure that prefix use and suffix Query align with endpoint above

export const {
	useGetUserQuery,
	useGetDashboardQuery,
	useGetProductsCardQuery,
	useGetProductsTableQuery,
	useGetContractsQuery,
	useGetRoyaltiesQuery,
} = api;
