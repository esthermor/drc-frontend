import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Link,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Security, Info } from "@material-ui/icons";
import footerpixel from "../asset/pixelated_footer.png";

function Footer() {
  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <img
        src={footerpixel}
        style={{
          position: "relative",
          bottom: "-10px",
        }}
      ></img>
      {/* <Grid container justifyContent="center" style={{ minHeight: "150px" }}>
        <Grid
          container
          item
          sm={6}
          xs={11}
          justifyContent="space-between"
          display="flex"
          alignContent="center"
        >
          <Grid item sm={5} xs={12}>
            <Security color="action" />
            <Typography paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
              <Link
                href="https://stripe.com/docs/security/stripe"
                target="_blank"
                alt="Stripe"
              >
                here
              </Link>
              .
            </Typography>
          </Grid>
          <Grid item sm={5} xs={11}>
            <Info color="action" />
            <Typography paragraph>
              This Web App is fully responsive (hopefully!). Made in{" "}
              <Link href="https://reactjs.org/" target="_blank">
                ReactJS
              </Link>
              , using{" "}
              <Link href="https://material-ui.com" target="_blank">
                Material-UI
              </Link>{" "}
              .
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
      <AppBar
        position="static"
        elevation={0}
        component="footer"
        color="default"
      >
        <Toolbar
          style={{ justifyContent: "center", backgroundColor: "#6B0D74" }}
        >
          <Typography variant="caption">
            ©2022 Ka-Ching! All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Footer;
