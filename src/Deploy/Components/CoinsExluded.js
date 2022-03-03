import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./CoinsExcluded.css";

const useStyles = makeStyles({
  title: {
    color: "black",
  },
});

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
    setCoin("");
  };
  const handleOnChange = (event) => {
    setCoin(event.target.value);
  };

  const classes = useStyles();

  return (
    <div className="containerr">
      <Typography variant="h5" component="div" className={classes.title}>
        Coins excluded
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {coinsExcluded ? coinsExcluded.map((coin) => coin + " ") : ""}
      </Typography>

      <div className="addCoin">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Add coin to exlude"
            variant="outlined"
            type="text"
            value={coin}
            name="coin"
            onChange={handleOnChange}
            className={classes.input}
            size="small"
          />

          <Button className={classes.input} type="submit">
            <Typography className={classes.buttonText}>Add</Typography>
          </Button>
        </form>
      </div>
    </div>
  );
}
