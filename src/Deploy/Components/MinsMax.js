import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import "./MinsMax.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import httpsClient from "./httpsClient";

export const MinsMax = () => {
	const API = process.env.REACT_APP_API;
	const localhost = process.env.LOCALHOST;
	const [state, setState] = useState({});
	//const [coins, setCoins] = useState();
	const [mins, setMins] = useState([]);
	const [max, setMax] = useState([]);
	const [tracked, setTracked] = useState(0);
	const [errors, setErrors] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isFinish, setFinish] = useState(false);

	const handleSubmit = async (event) => {
		setLoading(true);
		event.preventDefault();
		let coins = await axios.get(`${API}/api/coins/${state.coinsQuantity}`);

		let minsMax = {
			min: [],
			max: [],
			errors: [],
		};
		let coinsTracked = 0;

		await coins.data.forEach(async (coin) => {
			try {
				const result = await axios.get(
					`http://192.168.0.252:5000/api/min_max_today?days_back=${state.daysBack}d&pair=${coin}-usd`
				);
				coinsTracked += 1;
				setTracked(coinsTracked);
				console.log("result:", coin, result);
				if (result.data.min) {
					minsMax.min.push(coin);
				}
				if (result.data.max) {
					minsMax.max.push(coin);
				}
				if (result.data.error) {
					minsMax.errors.push(coin);
					setErrors(minsMax.errors);
				}

				const result_1 = minsMax;
				Promise.all(result_1.min).then((result_2) => {
					setMins(result_2);
				});

				Promise.all(result_1.max).then((result_3) => {
					setMax(result_3);
				});

				if (coin == coins.data[coins.data.length - 1] && result.status == 200) {
					console.log("asd");
					setLoading(false);
					console.log(minsMax);
					postReport(minsMax);
				}
			} catch (err) {
				minsMax.errors.push(coin);
				setErrors(minsMax.errors);
			}
		});

		handleReset();
		console.log("mins", mins);
		console.log("max", max);
	};
	const handleOnChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		setState((values) => ({ ...values, [name]: value }));
	};

	function handleReset() {
		setState({
			daysBack: "",
			coinsQuantity: "",
		});
	}

	async function postReport(obj) {
		console.log("mins", mins);
		console.log("max", max);

		try {
			let request = await httpsClient.post("//localhost:5000/createreport", {
				errors: obj.errors.length,
				days_back: state.daysBack,
				coins_requested: state.coinsQuantity,
				max: obj.max.length,
				min: obj.min.length,
				date: Date.now(),
			});
			console.log("success", request);
			return;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					<TextField
						type="number"
						value={state.daysBack}
						name="daysBack"
						onChange={handleOnChange}
						placeholder="Days Back"
					></TextField>
				</label>

				<label>
					<TextField
						type="number"
						value={state.coinsQuantity}
						name="coinsQuantity"
						onChange={handleOnChange}
						placeholder="Coints quantity"
					></TextField>
				</label>
				<Button type="submit">
					<Typography>Request</Typography>
				</Button>
			</form>
			{isLoading ? <Loading></Loading> : ""}
			<div className="container">
				<div className="flexInnerDiv">
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Max Today({max?.length ? max.length : 0})
					</Typography>
					{max
						? max.map((coin) => {
								return (
									<Typography
										sx={{ color: "black" }}
										variant="h5"
										component="div"
										id={coin}
										key={coin}
									>
										{coin}
									</Typography>
								);
						  })
						: ""}
				</div>
				<div className="flexInnerDiv">
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Min Today({mins?.length ? mins.length : 0})
					</Typography>
					{mins
						? mins.map((coin) => {
								return (
									<Typography
										sx={{ color: "black" }}
										variant="h5"
										component="div"
										id={coin}
										key={coin}
									>
										{coin}
									</Typography>
								);
						  })
						: ""}
				</div>
				<div className="flexInnerDiv">
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Coins with errors({errors?.length ? errors.length : 0})
					</Typography>
					{errors
						? errors.map((coin) => {
								return (
									<Typography
										sx={{ color: "black" }}
										variant="h5"
										component="div"
										id={coin}
										key={coin}
									>
										{coin}
									</Typography>
								);
						  })
						: ""}
				</div>
				<div className="flexInnerDiv">
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Tracked
					</Typography>
					{tracked ? (
						<Typography sx={{ color: "black" }} variant="h5" component="div">
							{tracked}
						</Typography>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};
