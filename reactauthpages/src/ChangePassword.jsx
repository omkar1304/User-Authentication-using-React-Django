import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useChangeUserPasswordMutation } from './services/userAuthAPI';
import { getToken } from './services/localStorageService';
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function ChangePassword() {

  const [data, setData] = useState({
    password : "",
    password2 : "",
  });

  const [serverError, setServerError] = useState({});
  const [ serverData, setServerData] = useState({})

  const [ changeUserPassword ] = useChangeUserPasswordMutation()
  
  const navigate = useNavigate()
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { access } = getToken();
    const response = await changeUserPassword({ data, access });
    console.log(response.data)
    
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              {serverError.password2 ? (
                <Typography
                  style={{
                    fontSize: 12,
                    color: "red",
                    paddingLeft: 18,
                    paddingTop: 5,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 12}}/>
                  {"  " + serverError.password2[0]}
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
              Change password
            </Button>
            {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ""}
            {serverData.msg ? <Alert severity="success">{serverData.msg}</Alert> : ""}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}