import logo from "./logo.svg";
import "./App.css";
import { MinsMax } from "./Deploy/Components/MinsMax";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MinsMax></MinsMax>
      </header>
    </div>
  );
}

export default App;
