import React from "react";
import { Icon, Upload, Button } from "antd";
import { Form } from "react-bootstrap";
class UploadFormPage extends React.Component {
  state = {
    place: "",
    details: "",
    contact_person: "",
    contact_no: "",
    image_location: "",
    errors: {}, // To store validation errors
  };

  validateForm = () => {
    const { place, details, contact_person, image_location, contact_no } =
      this.state;
    const errors = {};

    if (!place.trim()) {
      errors.place = "place is required";
    }
    if (!details.trim()) {
      errors.details = "details is required";
    }
    if (!contact_person.trim()) {
      errors.contact_person = "contact person is required";
    }

    if (!image_location.trim()) {
      errors.image_location = "Image is required";
    }
    if (!contact_no.trim()) {
      errors.contact_no = "Phone number is required";
    } else if (!/^\d{10}$/.test(contact_no)) {
      errors.contact_no = "Phone number must be 10 digits";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // onUploadAction = async () => {
  //   const isValid = this.validateForm();

  //   let uploadDetails = { ...this.state };
  //   var response = await fetch("api/user/publish", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       place: this.state.place,
  //       details: this.state.details,
  //       contact_person: this.state.contact_person,
  //       contact_no: this.state.contact_no,
  //       image_location: this.state.image_location,
  //       id: this.props.id,
  //       first_name: this.props.first_name,
  //     }),
  //   });
  //   const body = await response.text();
  //   if (response.status == 200) {
  //     let out = JSON.parse(body);
  //     alert("uploaded successfully");
  //     this.props.reloadProfile();
  //   } else if (response.status == 422) {
  //     alert("error uploadin");
  //   }
  // };

  onUploadAction = async () => {
    const isValid = this.validateForm();

    if (isValid) {
      let uploadDetails = { ...this.state };
      var response = await fetch("api/user/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          place: this.state.place,
          details: this.state.details,
          contact_person: this.state.contact_person,
          contact_no: this.state.contact_no,
          image_location: this.state.image_location,
          id: this.props.id,
          first_name: this.props.first_name,
        }),
      });
      const body = await response.text();
      if (response.status == 200) {
        let out = JSON.parse(body);
        alert("uploaded successfully");
        this.props.reloadProfile();
      } else if (response.status == 422) {
        alert("error uploading");
      }
    } else {
      alert("Please fill in all required fields and upload an image.");
    }
  };
  updateField = (type, value) => {
    console.log(value);
    this.setState({ [type]: value });
  };
  render() {
    const { errors, image_location } = this.state;
    const isImageUploaded = !!image_location.trim();
    return (
      <div>
        <Form style={{ border: "2px solid blue", padding: "10px" }}>
          <Form.Label style={{ fontSize: "25px" }}>Upload Documents</Form.Label>
          <Form.Group style={{ textAlign: "left" }} controlId="formPlace">
            <Form.Label>Place</Form.Label>
            <Form.Control
              type="text"
              value={this.state.place}
              onChange={(e) => {
                this.updateField("place", e.target.value);
              }}
              isInvalid={!!errors.place}
              placeholder="Enter Place"
            />
            <Form.Control.Feedback type="invalid">
              {errors.place}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            style={{ textAlign: "left" }}
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              value={this.state.details}
              onChange={(e) => {
                this.updateField("details", e.target.value);
              }}
              rows="3"
              isInvalid={!!errors.details}
            />
            <Form.Control.Feedback type="invalid">
              {errors.details}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ textAlign: "left" }} controlId="formPerson">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              type="text"
              value={this.state.contact_person}
              onChange={(e) => {
                this.updateField("contact_person", e.target.value);
              }}
              placeholder="contact person"
              isInvalid={!!errors.contact_person}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact_person}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ textAlign: "left" }} controlId="formPhone">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              value={this.state.contact_no}
              onChange={(e) => {
                this.updateField("contact_no", e.target.value);
              }}
              placeholder="contact phone"
              isInvalid={!!errors.contact_no}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact_no}
            </Form.Control.Feedback>
          </Form.Group>
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
              isInvalid={!!errors.image_location}
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
            <Form.Control.Feedback type="invalid">
              {errors.image_location}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ textAlign: "left" }}>
            <Button
              style={{
                width: "50%",
                background: "#007BFF",
                color: "white",
              }}
              variant="primary"
              onClick={this.onUploadAction}
              disabled={!isImageUploaded}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
export default UploadFormPage;
