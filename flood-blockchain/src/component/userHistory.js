import React from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Alert,
  Menu,
  Icon,
  Switch,
  Upload,
  Button,
  Card,
  message
} from "antd";
//import reqwest from "reqwest";

import InfiniteScroll from "react-infinite-scroller";
import { Container } from "react-bootstrap";

const { Header, Sider, Content } = Layout;

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
const { Meta } = Card;

class UserHistory extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    disabled: true
  };
  toggle = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  componentDidMount() {
    // this.fetchData(res => {
    //   this.setState({
    //     data: res.results
    //   });
    // });
  }

  // fetchData = callback => {
  //   reqwest({
  //     url: fakeDataUrl,
  //     type: "json",
  //     method: "get",
  //     contentType: "application/json",
  //     success: res => {
  //       callback(res);
  //     }
  //   });
  // };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    // this.fetchData(res => {
    //   data = data.concat(res.results);
    //   this.setState({
    //     data,
    //     loading: false
    //   });
    // });
  };

  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
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
            </Header>{" "}
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Container className="containerStyle">
                <div className="demo-infinite-container">
                  <InfiniteScroll
                    style={{ marginLeft: "200px" }}
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                  >
                    {/* <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List> */}

                    <Card
                      title="Card title"
                      extra={
                        <Alert message="Success Tips" type="success" showIcon />
                      }
                      hoverable="true"
                      style={{ width: "70%" }}
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
                      <br />
                      <div>
                        <Switch disabled={this.state.disabled} defaultChecked />
                        <br />
                        <br />
                        <Button type="primary" onClick={this.toggle}>
                          Toggle disabled
                        </Button>
                      </div>
                    </Card>
                    <Card
                      extra={
                        <Alert
                          message="Informational Notes"
                          type="info"
                          showIcon
                        />
                      }
                      title="Card title"
                      hoverable
                      style={{ width: "70%" }}
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
                      <br />
                      <div>
                        <Switch disabled={this.state.disabled} defaultChecked />
                        <br />
                        <br />
                        <Button type="primary" onClick={this.toggle}>
                          Toggle disabled
                        </Button>
                      </div>
                    </Card>
                  </InfiniteScroll>
                </div>
              </Container>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default UserHistory;
