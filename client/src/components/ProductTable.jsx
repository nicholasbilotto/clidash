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
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(100); //changed from 15881 change back for gavin site!
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

	const { data, isLoading, total, refetch } = useGetProductsTableQuery({
		page,
		pageSize,
		sort: JSON.stringify(sort),
		search,
	});

	const handlePageChange = (params) => {
		const newPage = params.page + 1;
		const newPageSize = params.pageSize;
		setPage(newPage);
		setPageSize(newPageSize);
		refetch({
			page: newPage,
			pageSize: newPageSize,
			sort: JSON.stringify(sort),
			search,
		});
	};

	// Generate columns from data keys
	let columns = [];
	let rows = [];

	if (data?.docs?.length) {
		columns = Object.keys(data.docs[0]).map((key) => ({
			field: key,
			headerName: key,
			width: 350,
			hide: !visibleColumns.includes(key),
		}));

		// Assign an id to each row (required by DataGrid)
		rows = data.docs.map((item, index) => ({
			id: index,
			...item,
		}));
	}

	return (
		<div style={{ height: 700, width: "100%" }}>
			<BubblyDataGrid
				theme={theme}
				loading={isLoading || !data}
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				onPageChange={handlePageChange}
				rowCount={data?.totalDocs}
				pagination
				slots={{ toolbar: GridToolbar }}
			/>
			{/* // pageSizeOptions={[100, 500, 1000]} need data grid pro /> */}
		</div>
	);
};

export default ProductTable;
