import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Container, Col, Form, Button, Row, Image } from "react-bootstrap";
import { Layout, Radio, Menu, Icon } from "antd";
import Contents from "./HomePage/homePage";

const { Header, Sider, Content } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <div>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>
                  {" "}
                  <Link to="/">Home</Link>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>
                  {" "}
                  <Link to="/user/profile">Profile</Link>
                </span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>
                  <Link to="/user/docs">Info</Link>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Container>
                <Row>
                  <Col sm={7}>
                    <h1 style={{ marginTop: "30px" }}>Crowd Sensing</h1>
                    <div
                      style={{
                        borderRight: "2px  solid",
                        color: "red",
                        height: "430px"
                      }}
                    >
                      <Image src="./proxy.png" fluid />
                    </div>
                  </Col>
                  <Col sm={5}>
                    <div style={{ marginTop: "150px" }}>
                      <Contents />
                    </div>
                  </Col>
                </Row>
              </Container>
            </Content>
          </Layout>
        </Layout>
      </div>

      // <div>
      //   <Container>
      //     <Row>
      //       <Col sm={7}>
      //         <h1 style={{ marginTop: "30px" }}>Crowd Sensing</h1>
      //         <div
      //           style={{
      //             borderRight: "2px  solid",
      //             color: "red",
      //             height: "400px"
      //           }}
      //         >
      //           <Image src="./proxy.png" fluid />
      //         </div>
      //       </Col>
      //       <Col sm={5}>
      //         <div style={{ marginTop: "130px" }}>
      //           <Content />
      //         </div>
      //       </Col>
      //     </Row>
      //   </Container>
      // </div>
    );
  }
}
export default Home;
