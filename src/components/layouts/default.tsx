import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Logo from "../../cardinal.png";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const StyledMainRootContainer = styled(Container)(({ theme }) => ({
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  minHeight: `calc(100vh - 65px)`,
  [theme.breakpoints.down("sm")]: {
    minHeight: `calc(100vh - 57px)`,
  },
}));

const StyledLogo = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
}));

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <React.Fragment>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img width={150} src={Logo} />
          </Toolbar>
        </Container>
      </AppBar>
      <StyledMainRootContainer disableGutters maxWidth="xl">
        {children}
      </StyledMainRootContainer>
    </React.Fragment>
  );
};

export default DefaultLayout;
