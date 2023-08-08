import React from "react";
import {
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Container,
	Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeSettings = (mode) => {
	// Your theme settings
};

const theme = createTheme(themeSettings("light")); // Choose mode 'light' or 'dark'

const LoginPage = () => {
	const [rememberMe, setRememberMe] = React.useState(false);

	const handleRememberMeChange = (event) => {
		setRememberMe(event.target.checked);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				component="main"
				maxWidth="xs"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<Typography component="h1" variant="h5">
					Log in
				</Typography>
				<form noValidate sx={{ width: "100%", mt: 1 }}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={
							<Checkbox
								value="remember"
								color="primary"
								checked={rememberMe}
								onChange={handleRememberMeChange}
							/>
						}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
					>
						Log In
					</Button>
				</form>
			</Container>
		</ThemeProvider>
	);
};

export default LoginPage;
