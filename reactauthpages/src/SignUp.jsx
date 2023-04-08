import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useRegisterUserMutation } from "./services/userAuthAPI";
import ErrorIcon from "@mui/icons-material/Error";
import { storeToken } from "./services/localStorageService";
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [serverError, setServerError] = useState({});

  const [registerUser] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await registerUser(data);
    console.log(response.data);

    if (response.data.errors) {
      setServerError(response.data.errors);
    } else {
      storeToken(response.data.data.token);
      navigate('/')
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={data.name}
                  onChange={handleOnChange}
                />
              </Grid>
              {serverError.name ? (
                <Typography
                  style={{
                    fontSize: 12,
                    color: "red",
                    paddingLeft: 18,
                    paddingTop: 5,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 12}}/>
                  {"  " + serverError.name[0]}
                </Typography>
              ) : (
                ""
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </Grid>
              {serverError.email ? (
                <Typography
                  style={{
                    fontSize: 12,
                    color: "red",
                    paddingLeft: 18,
                    paddingTop: 5,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 12}}/>
                  {"  " + serverError.email[0]}
                </Typography>
              ) : (
                ""
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={data.password}
                  onChange={handleOnChange}
                />
              </Grid>
              {serverError.password ? (
                <Typography
                  style={{
                    fontSize: 12,
                    color: "red",
                    paddingLeft: 18,
                    paddingTop: 5,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 12}}/>
                  {"  " + serverError.password[0]}
                </Typography>
              ) : (
                ""
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  value={data.password2}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            {serverError.password2 ? (
                <Typography
                  style={{
                    fontSize: 12,
                    color: "red",
                    paddingLeft: 0,
                    paddingTop: 5,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 12}}/>
                  {"  " + serverError.password2[0]}
                </Typography>
              ) : (
                ""
              )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ""}
            <Grid container justifyContent="center">
              <Grid item>
                <NavLink to='/login' style={{textDecoration:"none"}}>
                <Link variant="body2">Already have an account? Sign in</Link>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
