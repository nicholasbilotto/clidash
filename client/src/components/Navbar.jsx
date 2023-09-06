import React, { useState } from "react";
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
	ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "../assets/profile.jpg";
import {
	AppBar,
	Toolbar,
	useTheme,
	IconButton,
	InputBase,
	MenuItem,
	Button,
	Box,
	Typography,
	Menu,
} from "@mui/material";

//Notes for gap and p under FlexBetween
/* put this on parent component to not have to do margins and padding on children */
/* shorthand for padding and if you only have two values first represents top/botton second represents left/right */

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<AppBar
			sx={{ position: "static", background: "none", boxShadow: "none" }}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* LEFT SIDE */}
				<FlexBetween>
					<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<MenuIcon />
					</IconButton>
					{/* <FlexBetween
						backgroundColor={theme.palette.background.alt}
						borderRadius="9px"
						gap="3rem"
						p="0.1rem 1.5rem"
					>
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween> */}
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlined sx={{ fontSize: "25px" }} />
						) : (
							<LightModeOutlined sx={{ fontSize: "25px" }} />
						)}
					</IconButton>
				</FlexBetween>

				{/* RIGHT SIDE */}
				<FlexBetween gap="1.5rem">
					<FlexBetween></FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
