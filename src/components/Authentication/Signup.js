import { Box, Button, TextField } from "@material-ui/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import LogoIcon from "../../asset/logoicon.png";
import LogoWord from "../../asset/logoword.png";

function Signup({ handleClose }) {
  const [username, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
    } else if (!email || !password || !confirmPassword) {
      setAlert({
        open: true,
        message: "Please fill in the required information",
        type: "error",
      });
    } else {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setAlert({
          open: true,
          message: `Welcome abroad ${result.user.email}`,
          type: "success",
        });
        handleClose();
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  };
  return (
    <div>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginLeft: "200px",
          marginRight: "200px",
          marginTop: "50px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={LogoIcon} width="40" />
          <img src={LogoWord} width="200" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1> Create Account</h1>
        </div>
        <TextField
          variant="outlined"
          type="username"
          label="Enter Name"
          value={username}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "purple", color: "white" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}

export default Signup;
