import "./App.css";
import { MinsMax } from "./Deploy/Components/MinsMax";
import { MinsMaxContainer } from "./Deploy/Components/MinsMaxContainer";
import {Chart} from './Deploy/Components/Chart'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MinsMaxContainer></MinsMaxContainer>
        <Chart></Chart>
      </header>
    </div>
  );
}

export default App;
