import React, { useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import Header from "components/Header";
import Cards from "components/ProductCards";
import Table from "components/ProductTable";
import Tree from "components/ProductTree";
import { useSelector } from "react-redux";

const VIEW_TYPES = {
	TABLE: "TABLE",
	TREE: "TREE",
	CARDS: "CARDS",
};

const Breakdown = () => {
	const [currentView, setCurrentView] = useState(VIEW_TYPES.TABLE);

	const token = useSelector((state) => state.auth.token);

	const handleViewChange = (event) => {
		setCurrentView(event.target.value);
	};

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="PRODUCTS" subtitle="When filtering type value first" />
			<Table />
			{/* <Box>
				<Select value={currentView} onChange={handleViewChange}>
					<MenuItem value={VIEW_TYPES.TABLE}>Table</MenuItem>
					<MenuItem value={VIEW_TYPES.TREE}>Tree</MenuItem>
					<MenuItem value={VIEW_TYPES.CARDS}>Cards</MenuItem>
				</Select>
			</Box>
			<Box mt="40px" height="75vh">
				{currentView === VIEW_TYPES.TABLE ? <Table token={token} /> : null}
				{currentView === VIEW_TYPES.TREE ? <></> : null}
				{currentView === VIEW_TYPES.CARDS ? <></> : null}
			</Box> */}
		</Box>
	);
};

export default Breakdown;
