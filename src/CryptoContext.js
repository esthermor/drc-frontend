import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "./firebase";
import Service from "./service/Service";

const Crypto = createContext();

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalInfo, setGlobalInfo] = useState();
  const [open, setOpen] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const getCoinList = (currency) => {
    setLoading(true);

    Service.getCoinList(currency)
      .then((response) => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getCoinList(currency);
  }, [currency]);

  const getGlobalInfo = async () => {
    setLoading(true);

    await Service.getGlobalInfo()
      .then((response) => {
        setGlobalInfo(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getGlobalInfo();
  }, []);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (currency === "MYR") setSymbol("RM");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "JPY") setSymbol("¥");
    else if (currency === "GBP") setSymbol("£");
    else if (currency === "AUD") setSymbol("$");
    else if (currency === "CAD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        watchlist,
        user,
        currency,
        symbol,
        setCurrency,
        alert,
        setAlert,
        coins,
        loading,
        setLoading,
        globalInfo,
        open,
        setOpen,
      }}
    >
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
