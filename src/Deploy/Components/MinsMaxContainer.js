import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import CoinsExcluded from "./CoinsExluded";
import { MinsMax } from "./MinsMax";
const useStyles = makeStyles({
  background: {
    bgcolor: "silver",
    m: 1,
    borderColor: "text.primary",
    width: "5rem",
    height: "5rem",
  },
});

export function MinsMaxContainer() {
  const classes = useStyles();
  return (
    <div>
      <Box
        sx={{
          width: 600,

          backgroundColor: "silver",

          border: 1,
          borderColor: "black",
        }}
      >
        <CoinsExcluded></CoinsExcluded>
        <MinsMax></MinsMax>
      </Box>
    </div>
  );
}
