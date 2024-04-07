import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";

function MenuBar() {
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
          <Nav.Link href="/">HOME</Nav.Link>
          <Nav.Link href="/user/profile">PROFILE</Nav.Link>
          <Nav.Link href="/user/docs">INFO</Nav.Link>
        </Nav>
        <div inline style={{ margin: "0 50px 0 0" }}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              Login
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/register">Register</Link>
              </Dropdown.Item>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    </div>
  );
}
export default MenuBar;
