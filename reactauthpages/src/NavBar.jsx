import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from "./services/localStorageService";
import { useDispatch } from 'react-redux'
import { unSetUserToken} from './features/authSlice';
import { unsetUserInfo } from './features/userSlice';

export default function NavBar() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
      // removing token from localstorage and redux store
        removeToken();
        dispatch(unSetUserToken());

        // removing data from redux store
        dispatch(unsetUserInfo());
        
        navigate('/login');
    }

    const { access } = getToken();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
         {
            access 
            ? <Button color="inherit" onClick={handleLogout}>Logout</Button>
            : <Button color="inherit" onClick={handleLogin}>Login</Button>
         }
        </Toolbar>
      </AppBar>
    </Box>
  );
}