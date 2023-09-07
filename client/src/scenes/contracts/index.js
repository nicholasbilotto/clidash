import React, { useState, useEffect } from "react";
import {
	Box,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Checkbox,
	Typography,
	Button,
} from "@mui/material";
import { useGetContractsQuery } from "state/api";
import { visuallyHidden } from "@mui/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// data sorter function
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const groupByLicensor = (data) => {
	return data.reduce((groups, contract) => {
		const licensor = contract.Licensor;
		if (!groups[licensor]) {
			groups[licensor] = [];
		}
		groups[licensor].push(contract);
		return groups;
	}, {});
};

function sortedRowInformation(rowArray, comparator) {
	const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
	stabilizedRowArray.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedRowArray.map((el) => el[0]);
}

const createColumnVisibilityObject = () => ({
	Licensor: true,
	Licensee: false,
	Status: false,
	FileLink: false,
	Contract: false,
	WorkNotes: false,
	EffectiveDate: false,
	Term: false,
	Termination: false,
	TerminationDate: false,
	AlertDate: false,
	Advance: false,
	Royalty: false,
	PaymentTerms: false,
	Titles: false,
	LastActive: false,
	Billed: false,
	BillingDate: false,
	AmendmentInfo: false,
	Amendment: false,
	OriginalContractDate: false,
	Contract: false,
	Email: false,
	Phone: false,
	AdditionalNotes: false,
});

const Contracts = () => {
	const { data, isLoading } = useGetContractsQuery();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("Licensor");
	const [columnVisibility, setColumnVisibility] = useState({});
	const [collapsedLicensors, setCollapsedLicensors] = useState({});

	useEffect(() => {
		if (data && data[0]) {
			const initialColumnVisibility = Object.keys(data[0]).reduce(
				(obj, key) => ({ ...obj, [key]: true }),
				{}
			);
			setColumnVisibility(initialColumnVisibility);
		}
	}, [data]);

	useEffect(() => {
		if (data && data[0]) {
			const initialCollapsedLicensors = Object.keys(
				groupByLicensor(data)
			).reduce((obj, key) => ({ ...obj, [key]: false }), {});
			setCollapsedLicensors(initialCollapsedLicensors);
		}
	}, [data]);

	const handleSort = (property) => (event) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleColumnVisibility = (columnId) => {
		setColumnVisibility((prevVisibility) => ({
			...prevVisibility,
			[columnId]: !prevVisibility[columnId],
		}));
	};

	const handleCollapseAll = () => {
		setCollapsedLicensors(
			Object.keys(collapsedLicensors).reduce(
				(obj, key) => ({ ...obj, [key]: true }),
				{}
			)
		);
	};

	if (isLoading) return <div>Loading...</div>;

	const groupedData = groupByLicensor(data);

	if (true) {
		return <div>Coming soon...</div>;
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 750 }} size="small" stickyHeader>
				<TableHead>
					<Button onClick={handleCollapseAll}>Collapse All</Button>
					<TableRow>
						{Object.keys(columnVisibility).map(
							(column) =>
								columnVisibility[column] && (
									<TableCell key={column}>
										<Box display="flex" alignItems="center">
											<TableSortLabel
												active={orderBy === column}
												direction={
													orderBy === column ? order : "asc"
												}
												onClick={handleSort(column)}
											>
												{column}
												{orderBy === column ? (
													<Box
														component="span"
														sx={visuallyHidden}
													>
														{order === "desc"
															? "sorted descending"
															: "sorted ascending"}
													</Box>
												) : null}
											</TableSortLabel>
											<Checkbox
												size="small"
												checked={columnVisibility[column]}
												onChange={() =>
													handleColumnVisibility(column)
												}
											/>
										</Box>
									</TableCell>
								)
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.keys(groupedData).map((licensor) => (
						<>
							<TableRow key={licensor}>
								<TableCell>
									<IconButton
										size="small"
										onClick={() =>
											setCollapsedLicensors({
												...collapsedLicensors,
												[licensor]: !collapsedLicensors[licensor],
											})
										}
									>
										{collapsedLicensors[licensor] ? (
											<ExpandMoreIcon />
										) : (
											<ExpandMoreIcon />
										)}
									</IconButton>
									{licensor}
								</TableCell>
							</TableRow>
							{!collapsedLicensors[licensor] &&
								groupedData[licensor].map((row) => (
									<TableRow key={row._id}>
										{Object.keys(columnVisibility).map(
											(column) =>
												columnVisibility[column] && (
													<TableCell key={column}>
														{row[column]}
													</TableCell>
												)
										)}
									</TableRow>
								))}
						</>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Contracts;
