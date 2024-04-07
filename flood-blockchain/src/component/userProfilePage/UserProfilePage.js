import React from 'react';
import UploadFormPage from './UploadFormPage';
import { Col, Row, ButtonToolbar } from "react-bootstrap";
import { Card } from "antd";
import InfiniteScroll from "react-infinite-scroller";

const { Meta } = Card;
class UserProfilePage extends React.Component {
    state = {
        userPosts:[],
        uploadKey:0
    };

    componentDidMount = async () => {
        this.loadProfile();
        
    }
    loadProfile = async () => {
        var response = await fetch('/api/user/posts?id=' + this.props.userInfo.id , {
            method: "GET",
            headers: {
              'Content-Type': 'application\json',
            },
    
          });
          const body = await response.text();
          if (response.status == 200) {
            let out = JSON.parse(body);
           this.setState({userPosts:out, uploadKey:this.state.uploadKey + 1});
          } else if (response.status == 422) {
            alert(body);
          }
    }
    render() {
        return (
            <div style={{

                padding: 20,
                background: "#fff"
            }}>
                <Row>
                    <Col sm={5}>
                        <UploadFormPage key={this.state.uploadKey} reloadProfile = {
                            () => {
                                this.loadProfile();
                                }
                            }
                            id = {this.props.userInfo.id}
                            first_name = {this.props.userInfo.first_name} />
                    </Col>
                    <Col sm={7} className="colstyle">
                        <div
                            style={{
                                height: "100%",
                                minHeight: "560px",
                                paddingLeft: "100px",
                                paddingRight: "100px"
                            }}
                            className="demo-infinite-container"
                        >
                            <InfiniteScroll
                                initialLoad={false}
                                pageStart={0}
                                useWindow={false}
                            >
                            {this.state.userPosts.map(k=> {
                                return <Card
                                    title= {k.place}
                                    
                                    style={{ width: "100%" }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={"/imagesUpload/" + k.image_location}
                                        />
                                    }
                                >
                                    <Meta
                                        title= {k.contact_person}
                                        description={k.contact_no}
                                    />
                                </Card>;})}
                                
                            </InfiniteScroll>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default UserProfilePage;