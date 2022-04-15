import "./App.css";
import { MinsMax } from "./Deploy/Components/MinsMax";
import { Reports } from "./Deploy/Components/Reports";
import { MinsMaxContainer } from "./Deploy/Components/MinsMaxContainer";
import { Login } from "./Deploy/Components/Login";
import NavBar from "./Deploy/Components/NavBar";
import { Chart } from "./Deploy/Components/Chart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<NavBar></NavBar>
				<Routes>
					<Route exact path="minsmax" element={<MinsMaxContainer />} />
					<Route exact path="login" element={<Login />}></Route>
					<Route exact path="reports" element={<Reports />}></Route>
				</Routes>
			</header>
		</div>
	);
}

export default App;
