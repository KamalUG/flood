import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Icon, Radio, Upload } from "antd";

class RegisterPage extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    user_type: "regular",
    image_location: "",
    errors: {}, // To store validation errors
  };

  updateField = (type, value) => {
    this.setState({ [type]: value });
  };

  // Function to validate form
  validateForm = () => {
    const { first_name, last_name, email, password, phone, address } =
      this.state;
    const errors = {};

    if (!first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };
  handleRegister = async (e) => {
    e.preventDefault();
    //this.props.form.validateFieldsAndScroll(async (err, values) => {
    //if (!err) {

    const isValid = this.validateForm();

    if (isValid) {
      const response = await fetch(
        "/api/user/register?first_name=" + this.state.first_name,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
            user_type: this.state.user_type,
            image_location: this.state.image_location,
          }),
        }
      );
      const body = await response.text();
      if (response.status == 422) {
        alert(body);
      }
      if (response.status == 200) {
        let out = JSON.parse(body);
        this.props.onLoginAction(false);
        alert("Login id is " + out.insertId);
      }
    }

    // this.props.history.push("/");
    // }
    //});
  };

  render() {
    const { errors } = this.state;
    return (
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Form
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              border: "2px solid blue",
              padding: "60px",
              background: "white",
            }}
          >
            <h1 style={{ marginBottom: "20px" }}>Registration</h1>
            <Form.Row>
              <Form.Group as={Col}>
                <Radio.Group
                  onChange={(e) =>
                    this.updateField("user_type", e.target.value)
                  }
                  value={this.state.user_type}
                >
                  <Radio value={"volunteer"}>Volunteer</Radio>
                  <Radio value={"regular"}>Regular</Radio>
                </Radio.Group>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[0-9]/g, "");
                    this.updateField("first_name", newValue);
                  }}
                  isInvalid={!!errors.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Control
                  value={this.state.last_name}
                  name="lastName"
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[0-9]/g, "");
                    this.updateField("last_name", newValue);
                  }}
                  placeholder="Last Name"
                  isInvalid={!!errors.last_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.updateField("email", e.target.value)}
                  placeholder="Enter email"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.updateField("password", e.target.value)}
                  placeholder="Password"
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formPhone">
              <Form.Control
                name="phone"
                type="number"
                value={this.state.phone}
                onChange={(e) => this.updateField("phone", e.target.value)}
                placeholder="Mobile Number"
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAddress2">
              <Form.Control
                name="address"
                value={this.state.address}
                onChange={(e) => this.updateField("address", e.target.value)}
                placeholder="Address"
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            {this.state.user_type === "volunteer" ? (
              <Form.Group style={{ textAlign: "left" }} label="Upload">
                <Upload
                  action=""
                  id="uploadId"
                  name="logo"
                  beforeUpload={() => {
                    return false;
                  }}
                  onChange={(e, event) => {
                    console.log(e);
                    this.updateField("image_location", e.file.name);
                  }}
                  listType="picture"
                >
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>{" "}
                </Upload>
              </Form.Group>
            ) : (
              ""
            )}

            <Form.Row>
              <Form.Group as={Col}>
                <Button
                  style={{ width: "100%" }}
                  variant="primary"
                  onClick={(e) => {
                    this.handleRegister(e);
                  }}
                >
                  Register
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}
export default RegisterPage;
