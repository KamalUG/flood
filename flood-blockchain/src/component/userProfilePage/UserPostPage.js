import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Alert, Switch, Button, Card, message, Row, Icon } from "antd";
const { Meta } = Card;
class UserPostPage extends React.Component {
  state = {
    userPosts: [],
    loading: false,
    hasMore: true,
    disabled: true,
  };
  componentDidMount = async () => {
    this.loadPosts();
  };
  onVerify = async (id, image_id, status) => {
    var response = await fetch("/api/users/id?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const output = await response.text();
    console.log("out", output, status);
    if (response.status == 200 && status === "verify") {
      let out = JSON.parse(output);
      var response = await fetch("/api/block/createAndMineBlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_account: this.props.userInfo,
          to_account: out,
          verifiedBy: this.props.userInfo.id,
          verifiedFor: out.id,
          image_id,
          id: out.id,
        }),
      });
      const body = await response.text();
      if (response.status == 200) {
        this.loadPosts();
      }
    }
    if (response.status == 200 && status === "reject") {
      console.log("in");

      let out = JSON.parse(output);

      var response = await fetch("/api/block/rejectRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_account: this.props.userInfo,
          to_account: out,
          verifiedBy: this.props.userInfo.id,
          verifiedFor: out.id,
          image_id,
          id: out.id,
        }),
      });
      const body = await response.text();
      if (response.status == 200) {
        this.loadPosts();
      }
    }
  };
  getStatus = (status) => {
    console.log("status", status);
    if (status === 50) {
      return <Alert message="Verified" type="success" showIcon />;
    } else if (status === -1) {
      return <Alert message="rejected" type="error" showIcon />;
    } else {
      return <Alert message="Not Verified" type="warning" showIcon />;
    }
  };
  loadPosts = async () => {
    var response = await fetch("/api/user/posts", {
      method: "GET",
      headers: {
        "Content-Type": "applicationjson",
      },
    });
    const body = await response.text();
    if (response.status == 200) {
      let out = JSON.parse(body);

      this.setState({
        userPosts: out.filter((k) => k.id !== this.props.userInfo.id),
      });
    } else if (response.status == 422) {
      alert(body);
    }
  };
  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
  };
  render() {
    return (
      <div
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
          maxHeight: 545,
        }}
        className="demo-infinite-container"
      >
        <InfiniteScroll
          style={{ marginLeft: "200px" }}
          initialLoad={false}
          pageStart={0}
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

          {this.state.userPosts.map((k) => {
            return (
              <Card
                title={k.place}
                extra={
                  this.getStatus(k.verified_count)
                  //   k.verified_count === 50 ? (
                  //     <Alert message="Verified" type="success" showIcon /> ? (
                  //       <Alert message="rejected" type="warning" showIcon />
                  //     ) : (
                  //       <Alert message="Not Verified" type="error" showIcon />
                  //     )
                  //   ) : (
                  //     ""
                  //   )
                }
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src={"/imagesUpload/" + k.image_location}
                  />
                }
              >
                <Meta
                  title={"uploaded by: " + k.first_name}
                  description={k.details}
                />
                {(k.verified_count === 50) |
                (k.verified_count === -1) ? null : (
                  <>
                    <Icon
                      twoToneColor="#52c41a"
                      onClick={(e) => {
                        this.onVerify(k.id, k.image_id, "verify");
                      }}
                      style={{ fontSize: "40px", color: "green" }}
                      type="check-circle"
                      theme="twoTone"
                    />
                    {k.verified_count === -1 ? null : (
                      <Icon
                        twoToneColor="red"
                        onClick={(e) => {
                          this.onVerify(k.id, k.image_id, "reject");
                        }}
                        style={{
                          fontSize: "40px",
                          color: "red",
                          marginLeft: "4px",
                        }}
                        type="close-circle"
                        theme="twoTone"
                      />
                    )}
                  </>
                )}
              </Card>
            );
          })}
          {/* <Card
                        title="Card title"
                        
                        style={{ width: "60%" }}
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
                        style={{ width: "60%" }}
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
                    </Card> */}
        </InfiniteScroll>
      </div>
    );
  }
}
export default UserPostPage;
