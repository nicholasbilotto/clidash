import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
	DownloadOutlined,
	Email,
	PointOfSale,
	PersonAdd,
	Traffic,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetRoyaltiesQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
	const { data, isLoading } = useGetRoyaltiesQuery();

	if (isLoading) return "Loading...";

	const months = [
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER",
	];

	const currentMonthIndex = new Date().getMonth(); // Month is 0-indexed (0 for January, 1 for February, etc.)
	const currentMonth = months[currentMonthIndex];

	const previousMonth =
		currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1];

	const yearlyRoyaltiesTotal = Math.round(
		data.reduce((sum, item) => sum + (item.TOTAL || 0), 0)
	);

	const monthlyRoyalties = Math.round(
		data.reduce((sum, item) => sum + (Number(item[currentMonth]) || 0), 0)
	);

	// Calculate the total royalties for the current and previous months

	const previousMonthRoyalties = data.reduce(
		(sum, item) => sum + (Number(item[previousMonth]) || 0),
		0
	);

	// Calculate the percentage increase since last month
	let percentageIncrease = 0;
	if (previousMonthRoyalties > 0) {
		percentageIncrease =
			((monthlyRoyalties - previousMonthRoyalties) /
				previousMonthRoyalties) *
			100;
	}

	const formattedYearlyRoyalties = `$${yearlyRoyaltiesTotal.toLocaleString()}`;
	const formattedMonthlyRoyalties = `$${monthlyRoyalties.toLocaleString()}`;

	const formattedPercentageIncrease = `${percentageIncrease.toFixed(2)}%`;

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "userId",
			headerName: "User ID",
			flex: 1,
		},
		{
			field: "createdAt",
			headerName: "CreatedAt",
			flex: 1,
		},
		{
			field: "products",
			headerName: "# of Products",
			flex: 0.5,
			sortable: false,
			renderCell: (params) => params.value.length,
		},
		{
			field: "cost",
			headerName: "Cost",
			flex: 1,
			renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
		},
	];

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

				<Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: "14px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlined sx={{ mr: "10px" }} />
						Download Reports
					</Button>
				</Box>
			</FlexBetween>

			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="160px"
				gap="20px"
				sx={{
					"& > div": {
						gridColumn: isNonMediumScreens ? undefined : "span 12",
					},
				}}
			>
				{/* ROW 1 */}
				<StatBox
					title="2022 Royalties YTD"
					value={formattedYearlyRoyalties}
					description="Since last year"
					icon={
						<Email
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>
				<StatBox
					title="Monthly Royalties"
					value={formattedMonthlyRoyalties}
					increase={formattedPercentageIncrease}
					description="Since last month"
					icon={
						<PointOfSale
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>
				<Box
					gridColumn="span 8"
					gridRow="span 2"
					backgroundColor={theme.palette.background.alt}
					p="1rem"
					borderRadius="0.55rem"
				>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>
				<StatBox
					title="Monthly Sales"
					value={null}
					description="Since last month"
					icon={
						<PersonAdd
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>
				<StatBox
					title="Yearly Sales"
					value={null}
					description="Since last year"
					icon={
						<Traffic
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>

				{/* ROW 2 */}
				<Box
					gridColumn="span 8"
					gridRow="span 3"
					sx={{
						"& .MuiDataGrid-root": {
							border: "none",
							borderRadius: "5rem",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: "none",
						},
						"& .MuiDataGrid-columnHeaders": {
							backgroundColor: theme.palette.background.alt,
							color: theme.palette.secondary[100],
							borderBottom: "none",
						},
						"& .MuiDataGrid-virtualScroller": {
							backgroundColor: theme.palette.background.alt,
						},
						"& .MuiDataGrid-footerContainer": {
							backgroundColor: theme.palette.background.alt,
							color: theme.palette.secondary[100],
							borderTop: "none",
						},
						"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
							color: `${theme.palette.secondary[200]} !important`,
						},
					}}
				>
					<iframe
						class="airtable-embed"
						src="https://airtable.com/embed/appOUWo1JV78OIjRW/shrfbIJEiLsuilBtL?backgroundColor=green&viewControls=on"
						frameborder="0"
						onmousewheel=""
						width="100%"
						height="100%"
						style={{
							background: "transparent",
							border: "1px solid #ccc",
						}}
					></iframe>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={theme.palette.background.alt}
					p="1.5rem"
					borderRadius="0.55rem"
				>
					<Typography
						variant="h6"
						sx={{ color: theme.palette.secondary[100] }}
					>
						Royalties By Category
					</Typography>
					<BreakdownChart isDashboard={true} />
					<Typography
						p="0 0.6rem"
						fontSize="0.8rem"
						sx={{ color: theme.palette.secondary[200] }}
					>
						Breakdown of real states and information via category for
						revenue made for this year and total sales.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
