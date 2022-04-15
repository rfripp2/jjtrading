import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
	return (
		<Box>
			<AppBar sx={{ marginBottom: 10 }} position="static">
				<Toolbar>
					<Link to="/login">
						<Button color="inherit">Login</Button>
					</Link>
					<Link to="/reports">
						<Button color="inherit">Reports</Button>
					</Link>
					<Link to="/minsmax">
						<Button color="inherit">Mins And Max</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
