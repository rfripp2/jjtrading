import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MaterialTable from "material-table";
import { DataGrid } from "@mui/x-data-grid";
export function MinsMaxReport(props) {
	const data = [{ min: props.min, max: props.max, date: props.date }];
	const columns = [
		{ title: "Date", field: "date" },
		{
			title: "Mins",
			field: "min",
		},
		{
			title: "Max",
			field: "max",
		},
	];
	return (
		<div>
			<p>{props.max}</p>
			<p>{props.min}</p>
		</div>
	);
}
