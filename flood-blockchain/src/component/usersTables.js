import React from "react";
import { Table, Layout, Menu, Icon, Divider, Tag } from "antd";

const { Header, Sider, Content } = Layout;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "volunteer"]
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["User"]
  },
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "volunteer"]
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["User"]
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "volunteer"]
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["User"]
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "volunteer"]
  }
];
class UserTable extends React.Component {
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
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
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
                minHeight: 560
              }}
            >
              <Table dataSource={data}>
                <ColumnGroup title="Name">
                  <Column
                    title="First Name"
                    dataIndex="firstName"
                    key="firstName"
                  />
                  <Column
                    title="Last Name"
                    dataIndex="lastName"
                    key="lastName"
                  />
                </ColumnGroup>
                <Column title="Email" dataIndex="age" key="age" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                  title="Tags"
                  dataIndex="tags"
                  key="tags"
                  render={tags => (
                    <span>
                      {tags.map(tag => (
                        <Tag color="blue" key={tag}>
                          {tag}
                        </Tag>
                      ))}
                    </span>
                  )}
                />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <span>
                      <a>Invite {record.lastName}</a>
                      <Divider type="vertical" />
                      <a>Delete</a>
                    </span>
                  )}
                />
              </Table>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default UserTable;
