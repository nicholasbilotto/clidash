export const themeSettings = (mode) => {
	const primaryMain = mode === "dark" ? "#0d47a1" : "#1976d2"; // Deep Blue
	const secondaryMain = mode === "dark" ? "#2e7d32" : "#4caf50"; // Green
	const backgroundDefault = mode === "dark" ? "#424242" : "#fafafa"; // Off White or dark gray

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
