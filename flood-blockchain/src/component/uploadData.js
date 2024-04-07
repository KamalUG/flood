import React from "react";
import { Layout, Menu, Icon, Upload, Button } from "antd";
import { Container, Form, Col, Row, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class UploadData extends React.Component {
  render() {
    return (
      <div>
        <Container style={{ border: "2px solid blue" }}>
          <Form>
            <Form.Label style={{ fontSize: "40px" }}>
              Upload Documents
            </Form.Label>
            <Form.Group style={{ textAlign: "left" }} controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control type="text" placeholder="Enter Place" required />
            </Form.Group>
            <Form.Group
              style={{ textAlign: "left" }}
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Details</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group style={{ textAlign: "left" }} controlId="formPerson">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control type="text" placeholder="contact person" />
            </Form.Group>
            <Form.Group style={{ textAlign: "left" }} controlId="formPhone">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" placeholder="contact phone" />
            </Form.Group>
            <Form.Group style={{ textAlign: "left" }} label="Upload">
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            </Form.Group>
            <Form.Group style={{ textAlign: "left" }}>
              <Button
                style={{
                  width: "50%",
                  background: "#007BFF",
                  color: "white",
                }}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}
export default UploadData;
