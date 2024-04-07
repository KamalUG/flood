import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import HomePage from "../homePage/HomePage";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import UserProfilePage from "../userProfilePage/UserProfilePage";
import UserPostPage from "../userProfilePage/UserPostPage";
import AdminHomePage from "../adminActionPage/AdminHomePage";

class LandingPage extends React.Component {
  state = {
    selectedPage: "HOME",
    isLoginSuccess: false,
    userInfo: {},
  };

  updatePageSelection = (clickedPage) => {
    this.setState({ selectedPage: clickedPage });
  };
  onLoginAction = (isSuccess, userInfo) => {
    if (isSuccess) {
      this.setState({ userInfo });
      this.updatePageSelection("HOME");
    } else {
      this.updatePageSelection("LOGIN");
    }
    this.setState({ isLoginSuccess: isSuccess });
  };
  findPage = (type) => {
    let resultantPage = null;
    switch (type) {
      case "HOME":
        resultantPage = <HomePage />;
        break;
      case "LOGIN":
        resultantPage = <LoginPage onLoginAction={this.onLoginAction} />;
        break;
      case "REGISTER":
        resultantPage = <RegisterPage onLoginAction={this.onLoginAction} />;
        break;
      case "PROFILE":
        if (this.state.userInfo.user_type === "admin") {
          resultantPage = <AdminHomePage userInfo={this.state.userInfo} />;
        } else {
          resultantPage = <UserProfilePage userInfo={this.state.userInfo} />;
        }
        break;
      case "USERHOME":
        resultantPage = <UserPostPage userInfo={this.state.userInfo} />;
        break;
    }
    return resultantPage;
  };
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">
            <img
              src="./images.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={(e) => this.updatePageSelection("HOME")}>
              HOME
            </Nav.Link>
            {this.state.isLoginSuccess ? (
              <React.Fragment>
                {this.state.userInfo.user_type !== "volunteer" ? (
                  <Nav.Link
                    onClick={(e) => this.updatePageSelection("PROFILE")}
                  >
                    PROFILE
                  </Nav.Link>
                ) : (
                  ""
                )}
                <Nav.Link onClick={(e) => this.updatePageSelection("USERHOME")}>
                  POSTS
                </Nav.Link>
              </React.Fragment>
            ) : null}
          </Nav>

          {this.state.isLoginSuccess ? (
            <Nav className="mr">
              <Nav.Link onClick={(e) => this.onLoginAction(false)}>
                LOGOUT
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="mr">
              <Nav.Link onClick={(e) => this.updatePageSelection("LOGIN")}>
                LOGIN
              </Nav.Link>
              <Nav.Link onClick={(e) => this.updatePageSelection("REGISTER")}>
                REGISTER
              </Nav.Link>
            </Nav>
          )}
        </Navbar>
        <Container>{this.findPage(this.state.selectedPage)}</Container>
      </div>
    );
  }
}
export default LandingPage;
