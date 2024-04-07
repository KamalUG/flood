import React from "react";
import {
  Image,
  Table,
  Divider,
  Tag,
  Alert,
  Row,
  Col,
  Button,
  Modal,
} from "antd";
import ViewImage from "./ViewImage";
// import { Image } from "antd";
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

class AdminHomePage extends React.Component {
  state = {
    users: [],
    blocks: [],
    visible: false,
  };
  setVisible = (value) => {
    this.setState({ visible: value });
  };

  loadColumns = () => {
    return [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "First_Name",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "User Type",
        key: "user_type",
        dataIndex: "user_type",
        //  render: user_type => (
        //     <span>
        //       {tags.map(tag => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green';
        //         if (tag === 'loser') {
        //           color = 'volcano';
        //         }
        //         return (
        //           <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //           </Tag>
        //         );
        //       })}
        //     </span>
        //   ),
      },
      {
        title: "proof",
        key: "view",
        render: (text, record) => {
          let a = <span></span>;
          if (record.user_type === "volunteer" && record.is_verified === "N") {
            // a = (
            //   <>
            //     <Image
            //       preview={{
            //         visible: false,
            //       }}
            //       width={200}
            //       src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
            //       onClick={() => this.setVisible(true)}
            //     />
            //     <div
            //       style={{
            //         display: "none",
            //       }}
            //     >
            //       <Image.PreviewGroup
            //         preview={{
            //           visible,
            //           onVisibleChange: (vis) => this.setVisible(vis),
            //         }}
            //       >
            //         <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            //         <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
            //         <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
            //       </Image.PreviewGroup>
            //     </div>
            //   </>
            // );
            return <ViewImage Image={record.vounteer_proof} />;
          }
        },
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          let a = <span></span>;
          if (record.user_type === "volunteer" && record.is_verified === "N") {
            a = (
              <>
                <Button
                  onClick={() => this.onApprovalAction(record.id, "Y")}
                  icon="check"
                >
                  {" "}
                  Approve{" "}
                </Button>
                <Button
                  onClick={() => this.onApprovalAction(record.id, "R")}
                  icon="close"
                >
                  {" "}
                  Reject{" "}
                </Button>
              </>
            );
            {
              /* <span> */
            }
            {
              /* <Row> */
            }
            {
              /* <Col span={6}> */
            }

            {
              /* </Col> */
            }
            {
              /* <Col span={6}>  <Button  onClick = {()=>this.onApprovalAction(record.id,'N')}   icon="close" >Reject </Button>  */
            }
            {
              /* </Col> */
            }
            {
              /* </Row> */
            }
            {
              /* </span> */
            }
          }
          return a;
        },
      },
      {
        title: "Status",
        key: "status",
        render: (text, record) => {
          if (record.user_type === "volunteer" && record.is_verified === "N") {
            return <Alert message="Pending" type="warning" showIcon />;
          } else if (
            record.user_type === "volunteer" &&
            record.is_verified === "Y"
          ) {
            return <Alert message="verified" type="success" showIcon />;
          } else if (
            record.user_type === "volunteer" &&
            record.is_verified === "R"
          ) {
            return <Alert message="rejected" type="error" showIcon />;
          }
        },
      },
    ];
  };

  componentDidMount = async () => {
    this.loadUserData();
    this.fetchBlockChain();
  };

  onApprovalAction = async (id, value) => {
    var response = await fetch(
      "/api/user/approval?id=" + id + "&is_verified=" + value,
      {
        method: "GET",
        headers: {
          "Content-Type": "applicationjson",
        },
      }
    );
    if (response.status == 200) {
      this.loadUserData();
    } else {
      alert("error on updatin");
    }
  };
  loadUserData = async () => {
    var response = await fetch("/api/users/all", {
      method: "GET",
      headers: {
        "Content-Type": "applicationjson",
      },
    });
    const body = await response.text();
    if (response.status == 200) {
      let out = JSON.parse(body);
      this.setState({ users: out });
    } else if (response.status == 422) {
      alert(body);
    }
  };

  fetchBlockChain = async (e) => {
    const response = await fetch("/api/block/getCrowdBlockChain", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.text();

    if (response.status == 200) {
      let out = JSON.parse(body);
      this.setState({ blocks: out.chain });
    }
  };
  render() {
    let count = 1;

    let blocks = this.state.blocks.map(function (block) {
      return (
        <Col style={{ marginBottom: "10px" }} span={3} key={count}>
          <Block block={block} index={count++} />
        </Col>
      );
    });
    return (
      <div>
        <Table columns={this.loadColumns()} dataSource={this.state.users} />
        <Row type="flex" justify="center" align="top">
          {blocks}
        </Row>
      </div>
    );
  }
}

class Block extends React.Component {
  state = {
    visible: false,
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ visible: true })}
          type="primary"
          icon="box-plot"
          size={"large"}
        >
          {" "}
          {"Block" + this.props.index}{" "}
        </Button>
        <Modal
          title={"Values of Block " + this.props.index}
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
        >
          <p
            style={{
              overflow: "auto",
              whiteSpace: "pre",
              fontFamily: "monospace",
            }}
          >
            {JSON.stringify(this.props.block, null, "\t")}
          </p>
        </Modal>
      </div>
    );
  }
}
export default AdminHomePage;
