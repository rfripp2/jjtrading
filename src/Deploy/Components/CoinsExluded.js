import axios from "axios";
import { useState, useEffect } from "react";

export default function CoinsExcluded({ props }) {
  useEffect(() => {
    axios
      .get("https://jjtradingapi.herokuapp.com/api/minsmax/coinsexcluded")
      .then((result) => setCoinsExcluded(result.data));
  }, []);

  const [coin, setCoin] = useState();
  const [coinsExcluded, setCoinsExcluded] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(
      `https://jjtradingapi.herokuapp.com/api/minsmax/addcoin?coin=${coin}`
    );
    setCoinsExcluded([...coinsExcluded, coin]);
  };
  const handleOnChange = (event) => {
    setCoin(event.target.value);
    console.log(coin);
  };
  return (
    <div>
      <div className="coinsExcluded">
        <h2>Coins exluded:</h2>
        {coinsExcluded ? coinsExcluded.map((coin) => coin + " ") : ""}
      </div>
      <div className="addCoin">
        <form onSubmit={handleSubmit}>
          <label>
            Add coin to exclude:
            <input
              type="text"
              value={coin}
              name="coin"
              onChange={handleOnChange}
            ></input>
          </label>

          <input type="submit"></input>
        </form>
      </div>
      {console.log("coins exluded:", coinsExcluded)}
    </div>
  );
}
