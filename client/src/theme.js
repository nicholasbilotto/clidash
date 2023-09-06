export const themeSettings = (mode) => {
	const primaryMain = mode === "dark" ? "#007BFF" : "#1976d2"; // Bright Blue for Dark Mode, Deep Blue for Light Mode
	const secondaryMain = mode === "dark" ? "#4DBB63" : "#4caf50"; // Muted Green for Dark Mode, Green for Light Mode
	const backgroundDefault = mode === "dark" ? "#1E293B" : "#fafafa"; // Dark Blue-Gray for Dark Mode or Off White for Light Mode
	const textPrimary = mode === "dark" ? "#F5F7FA" : "#212121"; // Soft White for Dark Mode or Dark Gray for Light Mode
	const textSecondary = mode === "dark" ? "#FFFFFF" : "#757575"; // Muted White for Dark Mode or Medium Gray for Light Mode
	const backgroundAlt = mode === "dark" ? "#2A3E58" : "#e0e0e0"; // Lighter Blue-Gray for Dark Mode or Light Gray for Light Mode

	return {
		palette: {
			mode: mode,
			primary: {
				main: primaryMain,
			},
			secondary: {
				main: secondaryMain,
			},
			background: {
				default: backgroundDefault,
				alt: backgroundAlt,
			},
			text: {
				primary: textPrimary,
				secondary: textSecondary,
			},
		},
		typography: {
			fontFamily: ["Inter", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Inter", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	};
};
