import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuBar from "./component/menubar";
//import Home from "./component/homePage";
import RegisterForm from "./component/registerPage/RegisterPage";
import LoginForm from "./component/loginPage/LoginPage";
import UserProfile from "./component/userProfile";
import UploadData from "./component/uploadData";
import UserHistory from "./component/userHistory";
import UserTable from "./component/usersTables";
import LandingPage from "./component/landingPage/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/admin/user/table" component={UserTable} />
          <Route exact path="/user/docs" component={UserHistory} />
          <Route exact path="/user/profile" component={UserProfile} />
          <Route exact path="/register" component={RegisterForm} />
          {/* <Route exact path="/login" component={LoginForm} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
