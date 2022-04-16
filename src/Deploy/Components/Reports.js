import httpsClient from "./httpsClient";
import { useState, useEffect } from "react";
import { MinsMaxReport } from "./MinsMaxReport";
import { DataGrid } from "@mui/x-data-grid";
export function Reports() {
	const API = process.env.REACT_APP_API;
	const [user, setUser] = useState("");
	const [id, setId] = useState();
	const [reports, setReports] = useState();
	const [rows, setRows] = useState();
	useEffect(async () => {
		const response = await httpsClient.get(`${API}/getreport`);
		console.log("response", response);
		setReports(response.data);
	}, []);

	useEffect(async () => {
		const rows = await reports?.map((report, index) => {
			return {
				id: index,
				date: new Date(report.date).toLocaleString(),
				max: report.max,
				min: report.min,
				coinsRequested: report.coins_requested,
				daysBack: report.days_back,
				errors: report.errors,
			};
		});
		setRows(rows);
		console.log("rows", rows);
	}, [reports]);

	const columns = [
		{ field: "date", headerName: "date", width: 150 },
		{ field: "max", headerName: "max", width: 150 },
		{ field: "min", headerName: "min", width: 150 },
		{ field: "coinsRequested", headerName: "coinsRequested", width: 150 },
		{ field: "daysBack", headerName: "daysBack", width: 150 },
		{ field: "errors", headerName: "errors", width: 150 },
	];

	return (
		<div>
			{rows ? (
				<div style={{ height: 950, width: 950 }}>
					<DataGrid columns={columns} rows={rows} />
				</div>
			) : (
				""
			)}
		</div>
	);
}
