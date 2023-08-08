import React, { useState } from "react";
import { Button, TextField, Grid, Container } from "@mui/material";

const RoyaltyForm = () => {
	const [royalty, setRoyalty] = useState({
		Licensor: "",
		Licensee: "",
		Active: "",
		Category: "",
		Publication: "",
		JANUARY: "",
		FEBRUARY: "",
		MARCH: "",
		APRIL: "",
		MAY: "",
		JUNE: "",
		JULY: "",
		AUGUST: "",
		SEPTEMBER: "",
		OCTOBER: "",
		NOVEMBER: "",
		DECEMBER: "",
		TOTAL: "",
		Year: "",
		Notes: "",
	});

	const handleChange = (event) => {
		setRoyalty({
			...royalty,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Handle the form submission here
		console.log(royalty);
	};

	return (
		<Container maxWidth="md">
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					{Object.keys(royalty).map((key) => (
						<Grid item xs={12} sm={6} key={key}>
							<TextField
								fullWidth
								label={key}
								name={key}
								value={royalty[key]}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					))}
					<Grid item xs={12}>
						<Button variant="contained" color="primary" type="submit">
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default RoyaltyForm;
