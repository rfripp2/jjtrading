import { useState } from "react";
import axios from "axios";
import styles from "./MinsMax.css";
import CoinsExcluded from "./CoinsExluded";
export const MinsMax = () => {
  const [state, setState] = useState({});
  const [result, setResult] = useState();
  //const [coinsExcluded, setCoinsExcluded] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://jjtradingapi.herokuapp.com/minsmax?days_back=${state.daysBack}&coins_quantity=${state.coinsQuantity}`
      )
      .then((result) => {
        console.log(result.data);
        setResult(result.data);
      });
    handleReset();
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
  return (
    <div>
      <CoinsExcluded></CoinsExcluded>
      <form onSubmit={handleSubmit}>
        <label>
          Days Back:
          <input
            type="text"
            value={state.daysBack}
            name="daysBack"
            onChange={handleOnChange}
          ></input>
        </label>
        <br />
        <label>
          Quantity of coins:
          <input
            type="number"
            value={state.coinsQuantity}
            name="coinsQuantity"
            onChange={handleOnChange}
          ></input>
        </label>
        <input type="submit"></input>
      </form>
      <div className="container">
        <div className="flexInnerDiv">
          <h2>Max :</h2>
          {result ? <h3>Total: {result.max.total}</h3> : ""}
          {result ? result.max.coins.map((coin) => <p>{coin}</p>) : ""}
        </div>
        <div className="flexInnerDiv">
          <h2>Min :</h2>
          {result ? <h3>Total: {result.min.total}</h3> : ""}
          {result ? result.min.coins.map((coin) => <p>{coin}</p>) : ""}
        </div>
      </div>
    </div>
  );
};
