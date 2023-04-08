import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useResetEmailPasswordMutation } from "./services/userAuthAPI";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from 'react-router-dom'

const theme = createTheme();

export default function ResetPasswordEmail() {

  const [data, setData] = useState({
    email : "",
  });

  const navigate = useNavigate();

  const [ serverError, setServerError ] = useState({})
  const [ serverData, setServerData] = useState({})

  const [resetPasswordEmail] = useResetEmailPasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await resetPasswordEmail(data);

    if(response.data.errors){
      setServerError(response.data.errors);
    }
    else{
      setServerError({});
      setServerData(response.data.data)
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }

  };

  const handleOnChange = (event) => {
    const {name , value} = event.target;
    setData({...data, [name] : value});
  }

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
            Send Password Link
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ""}
            {serverData.msg ? <Alert severity="success">{serverData.msg}</Alert> : ""}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
