import React, { useState } from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import ScrollHorizontal from "./ScrollHorizontal";
import Service from "../service/Service";
import { CryptoState } from "../CryptoContext";

const useStyle = makeStyles(() => ({
  banner: {
    backgroundPosition: "center center",
    backgroundImage:
      "url(https://www.themasterpicks.com/wp-content/uploads/2020/04/22b22287602523.5dbd29081561d.gif)",
    display: "flex",
    justifyContent: "center",
  },
  bannerContent: {
    background: "radial-gradient(circle, #430046c4, transparent)",
    margin: "0",
    height: 800,
    paddingTop: 25,
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyle();
  const { currency } = CryptoState();

  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTrendingCoins = (e) => {
    setLoading(true);

    Service.getTrendingCoins(e)
      .then((response) => {
        setTrending(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    getTrendingCoins(currency);
  }, [currency]);

  console.log(trending);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.banner}>
      <Container maxWidth="xl" className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            style={{
              fontWeight: "bold",
              marginBottom: 5,
              fontFamily: "",
              color: "white",
              fontSize: "160px",
            }}
          >
            Ka-Ching !
          </Typography>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "",
              color: "white",
            }}
          >
            We make your life goes ka-ching &amp; ba-bling
          </Typography>
        </div>

        <ScrollHorizontal />
      </Container>
    </div>
  );
}

export default Banner;
