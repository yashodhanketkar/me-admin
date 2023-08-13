import { Box, Typography } from "@mui/material";
import { Dna } from "react-loader-spinner";

export const AuthLoadingScreen = () => {
  return (
    <Box
      sx={{
        zIndex: 999,
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "black",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        position: "fixed",
      }}
    >
      <Dna
        visible={true}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
      <Typography fontSize={35} color="primary">
        Authenticating
      </Typography>
    </Box>
  );
};
