import React from "react";
import { useGetRoyaltiesQuery } from "state/api";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

const Royalties = () => {
	const { data, isLoading } = useGetRoyaltiesQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>No data available</div>;
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Licensor</TableCell>
						<TableCell>Licensee</TableCell>
						<TableCell>Active</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Publication</TableCell>
						<TableCell>January</TableCell>
						<TableCell>February</TableCell>
						<TableCell>March</TableCell>
						<TableCell>April</TableCell>
						<TableCell>May</TableCell>
						<TableCell>June</TableCell>
						<TableCell>July</TableCell>
						<TableCell>August</TableCell>
						<TableCell>September</TableCell>
						<TableCell>October</TableCell>
						<TableCell>November</TableCell>
						<TableCell>December</TableCell>
						<TableCell>Total</TableCell>
						<TableCell>Year</TableCell>
						<TableCell>Notes</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => (
						<TableRow key={index}>
							<TableCell>{row.Licensor}</TableCell>
							<TableCell>{row.Licensee}</TableCell>
							<TableCell>{row.Active}</TableCell>
							<TableCell>{row.Category}</TableCell>
							<TableCell>{row.Publication}</TableCell>
							<TableCell>{row.JANUARY}</TableCell>
							<TableCell>{row.FEBRUARY}</TableCell>
							<TableCell>{row.MARCH}</TableCell>
							<TableCell>{row.APRIL}</TableCell>
							<TableCell>{row.MAY}</TableCell>
							<TableCell>{row.JUNE}</TableCell>
							<TableCell>{row.JULY}</TableCell>
							<TableCell>{row.AUGUST}</TableCell>
							<TableCell>{row.SEPTEMBER}</TableCell>
							<TableCell>{row.OCTOBER}</TableCell>
							<TableCell>{row.NOVEMBER}</TableCell>
							<TableCell>{row.DECEMBER}</TableCell>
							<TableCell>{row.TOTAL}</TableCell>
							<TableCell>{row.Year}</TableCell>
							<TableCell>{row.Notes}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Royalties;
