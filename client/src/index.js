import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import authReducer from "state/authSlice.js";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import { setToken } from "state/authSlice"; // Update this import path to your actual auth slice file

const store = configureStore({
	reducer: {
		global: globalReducer,
		auth: authReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

// Check for a token in local storage
const token = localStorage.getItem("token");
if (token) {
	store.dispatch(setToken(token));
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
