import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { getToken, removeToken } from "./services/localStorageService";
import NavBar from "./NavBar";
import { unSetUserToken} from './features/authSlice';
import { useDispatch } from 'react-redux'
import { useGetUserProfileQuery } from "./services/userAuthAPI";
import { setUserInfo, unsetUserInfo } from "./features/userSlice";

const HomePage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userData, setUseData] = useState({
    name : "",
    email : ""
  })


  // to store user data in local state and redux state
  const { access } = getToken();
  const { data, isSuccess } = useGetUserProfileQuery(access)

  useEffect(() => {

    if(data && isSuccess){
      setUseData({
        name : data.data.name,
        email : data.data.email,
      })

      dispatch(setUserInfo({
        name : data.data.name,
        email : data.data.email,
      }))
    }

  }, [data, isSuccess, dispatch])


  const handleLogout = () => {
    // removing token from localstorage and redux state
    removeToken();
    dispatch(unSetUserToken());

    // removing userdata from local state and redux state
    setUseData({ name : "", email : ""});
    dispatch(unsetUserInfo());

    navigate('/login');
  }

  return (
    <div>
      <NavBar />
      <div>
        <center>

          <h5>Name : {userData.name ? userData.name : "Anonymous User"}</h5>
          <h5>Email : {userData.email ? userData.email : "Anonymous@gmail.com"}</h5>

          <hr />

          <h3>Basic Operations</h3>
          <p>
            <Button variant="contained" onClick={() => navigate('/register')}>Sign Up</Button>
          </p>
          <p>
            <Button variant="contained" onClick={() => navigate('/login')}>Sign In</Button>
          </p>
          <p>
            <Button variant="contained" onClick={() => navigate('/change-password')}>Change Password</Button>
          </p>
          <p>
            <Button variant="contained" onClick={() => navigate('/reset-password-email')}>Reset Password Email</Button>
          </p>
          <p>
            <Button variant="contained" onClick={() => navigate('/api/account/reset-password/:id/:token')}>Reset Password</Button>
          </p>
          <p>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </p>
        </center>
      </div>
    </div>
  );
};

export default HomePage;
