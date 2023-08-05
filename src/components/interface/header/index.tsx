import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { NavBar } from "./navbar";

export const Header = async () => {
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            sx={{
              fontWeight: 700,
              fontFamily: "Dancing Script",
              ":hover": { color: "red" },
            }}
            variant="h5"
            component={"a"}
            href="/"
            noWrap
          >
            Yashodhan | Admin
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "end",
              display: "flex",
              gap: 1,
            }}
          >
            <NavBar />
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
