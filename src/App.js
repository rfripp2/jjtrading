import "./App.css";
import { MinsMax } from "./Deploy/Components/MinsMax";
import { MinsMaxContainer } from "./Deploy/Components/MinsMaxContainer";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MinsMaxContainer></MinsMaxContainer>
      </header>
    </div>
  );
}

export default App;
