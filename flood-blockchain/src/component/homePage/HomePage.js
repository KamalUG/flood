import React from "react";
import { Container, Col, Form, Button, Row, Image } from "react-bootstrap";
import { Carousel } from 'antd';
const HomePage = () => {
  return (
    <Carousel autoplay>
      <div>
      <Image
    width={1000}
    src="https://media.istockphoto.com/photos/aerial-view-of-flooded-houses-with-dirty-water-of-dnister-river-in-picture-id1327617934?b=1&k=20&m=1327617934&s=170667a&w=0&h=aZi48tcwAUl8WkkmbVJY_kod0cnTHQUybRPn6JaZmro="
  />
        <h3 >1</h3>
      </div>
      <div>
      <Image
    width={1000}
    src="https://res.cloudinary.com/value-penguin/image/upload/c_lfill,dpr_1.0,f_auto,h_1600,q_auto,w_1600/v1/flooded-residential-area_vjv8ek"
  />
        <h3 >2</h3>
      </div>
      <div>
      <Image
    width={1000}
    src="http://img.washingtonpost.com/rf/image_960w/2010-2019/WashingtonPost/2017/09/07/National-Enterprise/Videos/Images/t_1504805596299_name_hurricanebotsfordvideodoc.jpg"
  />
        <h3 >3</h3>
      </div>
      <div>
      <Image
    width={1000}
    src="https://cdn.vox-cdn.com/thumbor/4v7L2WTfD33F-WMbbRD9WrZyVtM=/0x0:3000x2000/1200x800/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/60095149/GettyImages_490700794.0.jpg"
  />
        <h3 >4</h3>
      </div>
    </Carousel>

  );
};
export default HomePage;
