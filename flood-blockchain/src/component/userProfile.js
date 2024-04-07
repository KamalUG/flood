import React from "react";
import { Layout, Menu, Icon, Upload, Button, Card } from "antd";
import { Container, Form, Col, Row, ButtonToolbar } from "react-bootstrap";
import UploadData from "./uploadData";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroller";

const { Header, Sider, Content } = Layout;
const { Meta } = Card;

class UserProfile extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>
                  <Link to="/">Home</Link>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>
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
                background: "#fff"
              }}
            >
              <Container>
                <Row>
                  <Col sm={5}>
                    <UploadData />
                  </Col>

                  <Col sm={7} className="colstyle">
                    <div
                      style={{
                        height: "100%",
                        minHeight: "600px",
                        paddingLeft: "100px",
                        paddingRight: "100px"
                      }}
                      className="demo-infinite-container"
                    >
                      <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                      >
                        <Card
                          title="Card title"
                          hoverable
                          style={{ width: "100%" }}
                          cover={
                            <img
                              alt="example"
                              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                          }
                        >
                          <Meta
                            title="Europe Street beat"
                            description="www.instagram.com"
                          />
                        </Card>
                        <Card
                          title="Card title"
                          hoverable
                          style={{ width: "100%" }}
                          cover={
                            <img
                              alt="example"
                              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                          }
                        >
                          <Meta
                            title="Europe Street beat"
                            description="www.instagram.com"
                          />
                        </Card>
                      </InfiniteScroll>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default UserProfile;
