import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ResetPasswordEmail from "./ResetPasswordEmail";
import ResetPassword from './ResetPassword'
import { useSelector} from 'react-redux'
import ChangePassword from "./ChangePassword";

function App() {

  const accessToken = useSelector((state) => state.auth.accessToken)

  return (
    <Router>
      <div className="App"></div>

      <Routes>
        <Route path="/" element={<HomePage />}/>
        {/* if no access token then user is not logged in so redirect to register/loign/changePassword page OR if access toke is there then user is logged in so redirect user to homepage */}
        <Route path="register" element={!accessToken ? <SignUp /> : <HomePage />}/>
        <Route path="login" element={!accessToken ? <SignIn /> : <HomePage />}/>
        <Route path="change-password" element={!accessToken ? <SignIn /> : <ChangePassword />} />
        {/* if no access token then user is not logged in so user can access reset password email else if access token is there then user is already logged in so redirect to homepage */}
        <Route path="reset-password-email" element={!accessToken ? <ResetPasswordEmail /> : <HomePage />} />
        <Route path="api/account/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
