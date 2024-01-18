import { Box, Typography } from "@mui/material";
import { InteractiveVoice } from "./component/InteractiveVoice/index";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function Home() {
  return (
    <main>
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InteractiveVoice />
      </Grid2>
    </main>
  );
}
