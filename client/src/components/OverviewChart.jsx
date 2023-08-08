import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetRoyaltiesQuery } from "state/api"; // update the API call

const OverviewChart = ({ isDashboard = false, view }) => {
	const theme = useTheme();
	const { data, isLoading } = useGetRoyaltiesQuery(); // update the API call

	const totalLine = useMemo(() => {
		if (!data) return [];

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

		const totalLine = {
			id: "total",
			color: theme.palette.secondary.main,
			data: [],
		};

		// Initialize a totals object to hold the sum of royalties for each month.
		let totals = {};
		months.forEach((month) => {
			totals[month] = 0;
		});

		// Iterate over each object in the data array and add the royalties to the totals.
		data.forEach((item) => {
			months.forEach((month) => {
				// Ensure that the royalties are numbers before adding them.
				if (typeof item[month] === "number") {
					totals[month] += item[month];
				}
			});
		});

		// Now, construct the data array for the line.
		months.forEach((month) => {
			totalLine.data = [...totalLine.data, { x: month, y: totals[month] }];
		});

		return [totalLine];
	}, [data]);

	if (!data || isLoading) return "Loading...";

	return (
		<ResponsiveLine
			data={totalLine}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: theme.palette.secondary[200],
						},
					},
					legend: {
						text: {
							fill: theme.palette.secondary[200],
						},
					},
					ticks: {
						line: {
							stroke: theme.palette.secondary[200],
							strokeWidth: 1,
						},
						text: {
							fill: theme.palette.secondary[200],
						},
					},
				},
				legends: {
					text: {
						fill: theme.palette.secondary[200],
					},
				},
				tooltip: {
					container: {
						color: theme.palette.primary.main,
					},
				},
			}}
			margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: "auto",
				max: "auto",
				stacked: false,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="catmullRom"
			enableArea={isDashboard}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				format: (v) => {
					if (isDashboard) return v.slice(0, 3);
					return v;
				},
				orient: "bottom",
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? "" : "Month",
				legendOffset: 36,
				legendPosition: "middle",
			}}
			axisLeft={{
				orient: "left",
				tickValues: 5,
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard
					? ""
					: `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
				legendOffset: -60,
				legendPosition: "middle",
			}}
			enableGridX={false}
			enableGridY={false}
			pointSize={10}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabelYOffset={-12}
			useMesh={true}
			legends={
				!isDashboard
					? [
							{
								anchor: "bottom-right",
								direction: "column",
								justify: false,
								translateX: 30,
								translateY: -40,
								itemsSpacing: 0,
								itemDirection: "left-to-right",
								itemWidth: 80,
								itemHeight: 20,
								itemOpacity: 0.75,
								symbolSize: 12,
								symbolShape: "circle",
								symbolBorderColor: "rgba(0, 0, 0, .5)",
								effects: [
									{
										on: "hover",
										style: {
											itemBackground: "rgba(0, 0, 0, .03)",
											itemOpacity: 1,
										},
									},
								],
							},
					  ]
					: undefined
			}
		/>
	);
};

export default OverviewChart;
