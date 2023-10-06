import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useGetProductsTableQuery } from "state/api";
import "primereact/resources/themes/saga-blue/theme.css"; // Adjust theme as per your preference
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";

const ProductTablePrime = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(1000); // Adjust as per your requirement
	const [expandedRows, setExpandedRows] = useState(null);

	// API call
	const { data, error, isLoading } = useGetProductsTableQuery({
		page: page,
		pageSize: pageSize,
		// ... other parameters
	});

	// Extracting products and totalProducts from data, if available
	const products = data?.docs || [];
	const totalProducts = data?.totalDocs || 0;

	const header = (
		<div className="flex flex-wrap align-items-center justify-content-between gap-2">
			<span className="text-xl text-900 font-bold">Products</span>
			{/* <Button icon="pi pi-refresh" rounded raised /> */}
		</div>
	);
	const footer = `${products ? products.length : 0} of  ${totalProducts}`;

	// const rowExpansionTemplate = (data) => {
	// 	return (
	// 		<div className="p-grid p-dir-col">
	// 			{/* Add your detailed view for expanded row content here */}
	// 			{/* Example: */}
	// 			<div className="p-col">
	// 				<b>ISBN:</b> {data.ISBN}
	// 			</div>
	// 			{/* ... More fields */}
	// 		</div>
	// 	);
	// };

	return (
		<div>
			{error && <p>Error: {error.message}</p>}
			<DataTable
				value={products}
				header={header}
				footer={footer}
				paginator
				rows={pageSize}
				totalRecords={totalProducts}
				lazy
				first={page - 1} // Convert to 0-based index
				onPage={(e) => {
					setPage(e.first / pageSize + 1); // Convert to 1-based index
					setPageSize(e.rows);
				}}
				loading={isLoading}
				// 	expandedRows={expandedRows}
				// 	onRowToggle={(e) => setExpandedRows(e.data)}
				// 	rowExpansionTemplate={rowExpansionTemplate}
			>
				<Column field="Client" header="Client" />
				<Column field="ProductName" header="Product Name" />
				<Column field="Category" header="Category" />
				<Column field="ISBN" header="ISBN" />
				<Column field="ISSN" header="ISSN" />
				<Column field="" header="" />
				<Column field="" header="" />
				{/* ... other columns */}
			</DataTable>
		</div>
	);
};

export default ProductTablePrime;
