import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import RegistrationBox from "../registrationBox/RegistrationBox";
import DisplayMessage from "../displayMessage/displayMessage";
import { post } from "../../service/userApi";

const Login =  () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    try {
      let { login = false, name = "" } = await post(email, "login");
      if (login) {
        setMessage(`Welcome back ${name}`);
        setLogged(true);
      } else {
        setNewUser(true);
      }
    } catch (error) {
      alert(error);
    }
    event.preventDefault();
  };

  const handleRegistration = async (response) => {
    // console.log(response);
    if (response) {
      try {
        let { name = "" } = await post(email, "register");
        if (name != "") {
          setMessage(`Welcome to Bterai ${name}`);
          setLogged(true);
        } else {
          setEmail("");
          setNewUser(false);
        }
      } catch (error) {
        alert(error);
      }
    } else {
    }
  };

  return (
    <div>
      <Grid item container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4}>
          {logged ? 
            <DisplayMessage message={message} />
          : 
            <div>
              {!newUser ? (
                <Box
                  sx={{
                    my: 8,
                    mt: 15,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={handleEmailChange}
                      error={!isEmailValid}
                      helperText={!isEmailValid ? "Invalid email address" : ""}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!isEmailValid}
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      Copyright © Bterai 2023
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <RegistrationBox handleRegistration={handleRegistration} />
              )}
            </div>
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
