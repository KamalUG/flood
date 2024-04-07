import React from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import { Radio } from "antd";
class LoginPage extends React.Component {
  state = {
    value: 1,
    password: "",
    userid: "",
    user_type: "regular",
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  updateField = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    var response = await fetch(
      "/api/user/login?userid=" +
        this.state.userid +
        "&password=" +
        this.state.password +
        "&user_type=" +
        this.state.user_type,
      {
        method: "GET",
        headers: {
          "Content-Type": "applicationjson",
        },
      }
    );
    const body = await response.text();
    if (response.status == 200) {
      let out = JSON.parse(body);
      if (this.state.user_type === "volunteer") {
        if (out.is_verified === "Y") {
          this.props.onLoginAction(true, out);
          console.log(out.is_verified);
        } else {
          alert("you are not verified");
        }
      } else {
        this.props.onLoginAction(true, out);
      }
    } else if (response.status == 422) {
      alert(body);
    }
  };

  render() {
    const fontStyle = {
      color: "Tomato",
    };
    return (
      <Row>
        <Col> </Col>
        <Col xs={6}>
          <Form
            style={{
              marginTop: "30px",
              border: "2px solid blue",
              padding: "80px",
              background: "white",
            }}
          >
            <h1 style={{ marginBottom: "30px" }}>Login </h1>
            <Radio.Group
              onChange={(e) => this.updateField("user_type", e.target.value)}
              value={this.state.user_type}
            >
              <Radio value={"admin"}>Admin</Radio>
              <Radio value={"volunteer"}>Volunteer</Radio>
              <Radio value={"regular"}>Regular</Radio>
            </Radio.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="number"
                style={fontStyle}
                value={this.state.UserId}
                onChange={(e) => {
                  this.updateField("userid", e.target.value);
                }}
                placeholder="Enter UserId"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                style={fontStyle}
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => {
                  this.updateField("password", e.target.value);
                }}
              />
            </Form.Group>

            <Button
              style={{ width: "100%", marginBottom: "15px" }}
              variant="primary"
              // onClick={(e) => { this.props.onLoginAction(true) }}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col> </Col>
      </Row>
    );
  }
}
export default LoginPage;
