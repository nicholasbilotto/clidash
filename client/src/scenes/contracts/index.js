import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { useGetContractsQuery } from "state/api";

const CustomToolbar = () => {
	return (
		<GridToolbarContainer>
			<Button
				variant="contained"
				color="primary"
				size="small"
				style={{ marginRight: 16 }}
			>
				New Contract
			</Button>
			<Button variant="outlined" color="primary" size="small">
				Export
			</Button>
			<GridToolbar />
		</GridToolbarContainer>
	);
};

const Contracts = () => {
	const { data, isLoading } = useGetContractsQuery();
	const [collapsedLicensors, setCollapsedLicensors] = useState({});

	useEffect(() => {
		// Initialize state based on data here
	}, [data]);

	const handleCollapseAll = () => {
		// Your existing collapse logic
	};

	if (isLoading) return <div>Loading...</div>;

	// Transform your data into a format DataGrid understands
	const rows = data.map((item, index) => ({ id: index, ...item }));
	const columns = Object.keys(data[0]).map((key) => ({
		field: key,
		headerName: key,
		width: 150,
	}));

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				components={{
					Toolbar: CustomToolbar,
				}}
			/>
		</div>
	);
};

export default Contracts;
