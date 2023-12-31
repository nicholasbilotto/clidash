import React, { useState } from "react";
import Button from "@mui/material/Button";
import { createSvgIcon } from "@mui/material/utils";
import {
	DataGrid,
	GridToolbar,
	GridToolbarContainer,
	useGridApiContext,
	gridExpandedSortedRowIdsSelector,
} from "@mui/x-data-grid";
import { useTheme, styled } from "@mui/material/styles";
import { useGetProductsTableQuery } from "state/api";

const ExportIcon = createSvgIcon(
	<path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
	"SaveAlt"
);

const BubblyDataGrid = styled(DataGrid)(({ theme }) => ({
	borderRadius: 15,
	"& .MuiDataGrid-columnHeaderTitle": {
		color: "#1976d2",
		fontWeight: "bold",
	},
	"& .MuiDataGrid-cell": {
		color: theme.palette.text.primary,
		fontWeight: 500,
	},
	"& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus":
		{
			outline: "none",
		},
}));

const CustomToolbar = () => (
	<GridToolbarContainer
		sx={{
			backgroundColor: "#3f51b5",
			color: "#fff",
			fontSize: "1.2rem",
		}}
	>
		<GridToolbar />
	</GridToolbarContainer>
);

const ProductTable = () => {
	const [page, setPage] = useState(1); // Initial page
	const [pageSize, setPageSize] = useState(1000); // Initial page size
	const [filterModel, setFilterModel] = useState({});
	const [filters, setFilters] = useState([]);
	const [field, setField] = useState("");
	const [operator, setOperator] = useState("");
	const [value, setValue] = useState("");

	const [sort, setSort] = useState({});
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [visibleColumns, setVisibleColumns] = useState([
		"Client",
		"ProductName",
		"Category",
		"Url",
	]);

	const theme = useTheme();

	const { data, isLoading, refetch } = useGetProductsTableQuery({
		page,
		pageSize,
		field,
		operator,
		value,
	});

	const handlePaginationModelChange = (model) => {
		const newPage = model.page + 1; // Convert to 1-based index
		const newPageSize = model.pageSize;

		// Update state
		setPage(newPage);
		setPageSize(newPageSize);

		console.log("Filters before refetch:", filters);

		// Fetch new data
		refetch({
			page: newPage,
			pageSize: newPageSize,
			filters: filters,
		});

		console.log(`Switched to page ${newPage} with page size ${newPageSize}`);
	};

	const handleFilterModelChange = (newModel) => {
		const filterItems = newModel.items || [];
		if (filterItems.length > 0) {
			const extractedFilters = filterItems.map((filter) => {
				const { field, operator, value } = filter;
				return { field, operator, value };
			});

			const { field, operator, value } = extractedFilters[0];

			// Update state variables
			setField(field);
			setOperator(operator);
			setValue(value);

			refetch({
				page,
				pageSize,
				field,
				operator,
				value,
			});
		}
	};

	// Generate columns from data keys
	let columns = [];
	let rows = [];

	if (data?.docs?.length) {
		columns = Object.keys(data.docs[0]).map((key) => ({
			field: key,
			headerName: key,
			width: 150,
		}));

		// Add an 'id' field for DataGrid to use
		rows = data.docs.map((doc, index) => ({ id: index, ...doc }));
	}

	return (
		<div style={{ height: 700, width: "100%" }}>
			<BubblyDataGrid
				loading={isLoading || !data}
				rows={rows}
				columns={columns}
				paginationMode="server"
				rowCount={data?.totalDocs}
				onPaginationModelChange={handlePaginationModelChange}
				slots={{ toolbar: GridToolbar }}
				filterMode="server"
				onFilterModelChange={handleFilterModelChange}
			/>
			{/* // pageSizeOptions={[100, 500, 1000]} need data grid pro /> */}
		</div>
	);
};

export default ProductTable;
