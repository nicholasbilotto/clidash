import React, { useState } from "react";
import {
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Container,
	Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../state/authSlice";
import { useNavigate } from "react-router-dom";

const themeSettings = (mode) => {
	// Your theme settings
};

const theme = createTheme(themeSettings("light")); // Choose mode 'light' or 'dark'

const LoginPage = () => {
	console.log(process.env.REACT_APP_BASE_URL);
	const dispatch = useDispatch();
	const [rememberMe, setRememberMe] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleRememberMeChange = (event) => {
		setRememberMe(event.target.checked);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/auth/login`,
				{
					email,
					password,
				}
			);
			console.log(data); // This will return the user data and the JWT token

			dispatch(loginSuccess(data));
			localStorage.setItem("token", data.token);

			navigate("/products");
		} catch (error) {
			console.error("Error logging in:", error.response.data.message);
		}
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
						value={email}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						onChange={(e) => setEmail(e.target.value)}
						autoFocus
					/>
					<TextField
						value={password}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
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
						onClick={handleLogin}
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
