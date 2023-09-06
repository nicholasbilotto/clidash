import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: null,
		isAuthenticated: false,
		user: null,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;
		},
		setToken: (state, action) => {
			state.token = action.payload;
			state.isAuthenticated = !!action.payload; // If the token exists, user is authenticated
		},
	},
});

export const { loginSuccess, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
