import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { useLoginUserMutation } from './services/userAuthAPI';
import ErrorIcon from "@mui/icons-material/Error";
import { getToken, storeToken } from './services/localStorageService';
import { useNavigate } from 'react-router-dom'
import { setUserToken} from './features/authSlice';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {

  const [data, setData] = useState({
    email : "",
    password : ""
  });

  const [serverError, setServerError] = useState({});

  const [loginUser] = useLoginUserMutation();

  const navigate = useNavigate();

  const disptach = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await loginUser(data);
    console.log(response.data);

    if (response.data.data.errors) {
      setServerError(response.data.data.errors);
      console.log(serverError);
    } else {
      console.log(response.data.data);
      storeToken(response.data.data.token);
      const { access } = getToken();
      disptach(setUserToken(access));
      navigate('/')
    }   
  };

  // when user refresh the page redux state gets reset everytime so even if user is loggedin (havong access token) user can still see login page to fix this we can use useEffect hook so whenever user refreshes the page we can get token from localstorage and store it in redux state as below ->

  let { access } = getToken();
  useEffect(() => {
    disptach(setUserToken(access));
  }, [access, disptach])

  

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleOnChange}
            />
            {serverError.email ? (
                <Typography
                  style={{
                    fontSize: 12,
                    color: "red",
                    paddingLeft: 0,
                    paddingTop: 5,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 12}}/>
                  {"  " + serverError.email[0]}
                </Typography>
              ) : (
                ""
              )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleOnChange}
            />
            {serverError.password ? (
                <Typography
                  style={{
                    fontSize: 12,
                    color: "red",
                    paddingLeft: 0,
                    paddingTop: 5,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 12}}/>
                  {"  " + serverError.password[0]}
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
              Sign In
            </Button>
            {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ""}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to='/register' style={{textDecoration:"none"}}>
                  <Link variant="body2">Don't have an account? Sign Up</Link>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}