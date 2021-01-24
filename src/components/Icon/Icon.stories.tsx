import React from "react";
import Icon from "./Icon";

export const IconTypes = () => {
  return <React.Fragment>
    <Icon type='iconchangjinglu' style={{fontSize: 24}} />
    <Icon type='iconweixiao' style={{fontSize: 24}} />
    <Icon type='iconjiantouarrow502' style={{fontSize: 24}} />
  </React.Fragment>
}

export default {
  title: 'Icon',
  component: Icon
}