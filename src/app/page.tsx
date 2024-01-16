import { Box, Typography } from "@mui/material";
import { InteractiveVoice } from "./component/interactiveVoice/index";
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
        <Box mb={3} display="flex" justifyContent="center">
          <Typography variant="h4" color="white" p="10px 0px">
            Interactive Quiz App
          </Typography>
        </Box>
        <Box
          sx={{
            m: 5,
          }}
        >
          <InteractiveVoice />
        </Box>
      </Grid2>
    </main>
  );
}
