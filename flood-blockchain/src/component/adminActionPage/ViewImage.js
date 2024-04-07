import { Button, Popover, Image, Space } from "antd";
import React, { useEffect, useState } from "react";

const ViewImage = (props) => {
  let ViewContent = (
    <>
      <img width={400} src={`imagesUpload/${props.Image}`} alt={props.Image} />
    </>
  );

  return (
    <Popover content={ViewContent} title="Title">
      <Button type="primary">View</Button>
    </Popover>
  );
};

export default ViewImage;
