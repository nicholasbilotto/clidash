import React, { useState } from "react";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Collapse,
	Button,
	Typography,
	useTheme,
	useMediaQuery,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import Header from "components/Header";
import { useGetProductsCardQuery } from "state/api";
import FlexBetween from "components/FlexBetween";

const Product = ({
	_id,
	name,
	description,
	Url,
	pubType,
	category,
	supply,
}) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Card
			sx={{
				backgroundImage: "none",
				backgroundColor: theme.palette.background.alt,
				borderRadius: "0.55rem",
			}}
		>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color={theme.palette.secondary[700]}
					gutterBottom
				>
					{description}
				</Typography>
				<Typography variant="h5" component="div">
					{name}
				</Typography>
				<Typography
					sx={{ mb: "1.5rem" }}
					color={theme.palette.secondary[400]}
				>
					{Url}]
				</Typography>
				{/* <Rating value={rating} readOnly /> */}

				<Typography variant="body2">{category}</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="Primary"
					size="small"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					See More
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
				sx={{ color: theme.palette.neutral[300] }}
			>
				<CardContent>
					<Typography> ISSN: {_id}</Typography>
					<Typography> ISBN: {supply}</Typography>
					<Typography>Publication Type: {pubType}</Typography>

					<Typography>First Year Published: </Typography>
					<Typography>Digital Object Identifier: </Typography>
					<Typography>Description: </Typography>
					<Typography>Issues Per Year: </Typography>
					<Typography>Publication Formats: </Typography>
					<Typography>Frequency of Online Content: </Typography>
					<Typography>Topics Covered: </Typography>
					<Typography>Uniqueness: </Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

const Cards = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetProductsCardQuery(page);

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const isNonMobile = useMediaQuery("(min-width: 1000px)");

	// State for handling selected dropdown options and search input
	const [client, setClient] = useState("");
	const [category, setCategory] = useState("");
	const [search, setSearch] = useState("");
	const theme = useTheme();

	console.log(data);

	return (
		<>
			{/* Client Dropdown */}
			<FlexBetween>
				<Box>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="client-label">Client</InputLabel>
						<Select
							labelId="client-label"
							id="client-select"
							value={client}
							onChange={(event) => setClient(event.target.value)}
							label="Client"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{/* You will replace with your own data */}
							<MenuItem value={10}>SPIE</MenuItem>
							<MenuItem value={20}>Arizent</MenuItem>
							<MenuItem value={30}>Etc.</MenuItem>
						</Select>
					</FormControl>

					{/* Category Dropdown */}
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="category-label">Category</InputLabel>
						<Select
							labelId="category-label"
							id="category-select"
							value={category}
							onChange={(event) => setCategory(event.target.value)}
							label="Category"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{/* You will replace with your own data */}
							<MenuItem value={10}>Optical</MenuItem>
							<MenuItem value={20}>Science</MenuItem>
							<MenuItem value={30}>Etc.</MenuItem>
						</Select>
					</FormControl>

					{/* Search Box */}
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<TextField
							id="search-input"
							label="Search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
						/>
					</FormControl>
				</Box>
				<Button onClick={handlePrevPage}>Previous</Button>
				<Button onClick={handleNextPage}>Next</Button>
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
					Download CSV
				</Button>
			</FlexBetween>

			{data || !isLoading ? (
				<Box
					mt="20px"
					display="grid"
					gridTemplateColumns="repeat(4, minmax(0, 1fr))"
					justifyContent="space-between"
					rowGap="20px"
					columnGap="1.33%"
					sx={{
						"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
					}}
				>
					{data?.docs?.map(
						({
							Client: client,
							ProductName: productName,
							Category: category,
							Url: url,
							ISBN: isbn,
							ISSN: issn,
							PublicationType: pubType,
						}) => (
							<Product
								key={issn}
								_id={issn}
								name={productName}
								description={category}
								Url={url}
								pubType={pubType}
								category={client}
								supply={isbn}
								// stat={stat}
							/>
						)
					)}
				</Box>
			) : (
				<>Loading...</>
			)}
		</>
	);
};

export default Cards;
