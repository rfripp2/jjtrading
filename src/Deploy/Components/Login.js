import { useState } from "react";
import httpsClient from "./httpsClient";
import {
	FormControl,
	InputLabel,
	FormHelperText,
	Input,
	TextField,
	Button,
	Stack,
} from "@mui/material";
const API = process.env.REACT_APP_API;
export function Login() {
	async function loginUser() {
		try {
			const response = await httpsClient.post(`${API}/login`, {
				password,
				username,
			});
			if (response.status == 200) {
				window.location.href = "/reports";
			}
		} catch (error) {
			if (error.response.status == 401) {
				alert("Invalid credentials");
			}
		}
	}

	async function createAccount() {
		const response = await httpsClient.post(`${API}/createUser`, {
			password,
			username,
		});
		console.log("response", response);
		if (response.status == 200) {
			window.location.href = "/login";
		}
	}

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	return (
		<Stack>
			<TextField
				value={username}
				onChange={(e) => setUserName(e.target.value)}
				label={"username"}
			></TextField>
			<TextField
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				label={"password"}
			></TextField>
			<Button
				type="submit"
				onClick={() => {
					loginUser();
				}}
			>
				Log in
			</Button>
			<Button
				type="submit"
				onClick={() => {
					createAccount();
				}}
			>
				Create Account
			</Button>
		</Stack>
	);
}
