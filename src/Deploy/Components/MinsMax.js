import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import "./MinsMax.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
export const MinsMax = () => {
  const [state, setState] = useState({});
  //const [coins, setCoins] = useState();
  const [mins, setMins] = useState();
  const [max, setMax] = useState();
  const [tracked, setTracked] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .get(
        `https://jjtradingapi.herokuapp.com/api/coins/${state.coinsQuantity}`
      )
      .then((result) => {
        return result.data;
      })
      .then((coins) => {
        let minsMax = {
          min: [],
          max: [],
        };
        let coinsTracked = 0;

        coins.forEach(async (coin) => {
          try {
            const result = await axios.get(
              `https://jjtradingapi.herokuapp.com/api/min_max_today?days_back=${state.daysBack}&pair=${coin}-usd`
            );
            if (coin === coins[coins.length - 1]) {
              setLoading(false);
            }
            coinsTracked += 1;
            setTracked(coinsTracked);
            if (result.data.min) {
              minsMax.min.push(coin);
            }
            if (result.data.max) {
              minsMax.max.push(coin);
            }
            const result_1 = minsMax;
            Promise.all(result_1.min).then((result_2) => {
              setMins(result_2);
            });

            Promise.all(result_1.max).then((result_3) => {
              setMax(result_3);
            });
          } catch (err) {
            setErrors([...errors, coin]);
          }
        });
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
      <form onSubmit={handleSubmit}>
        <label>
          <TextField
            type="text"
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
            Max Today
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
            Min Today
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
            Coins with errors
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
