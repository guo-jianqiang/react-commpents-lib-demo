/** @format */

import * as React from 'react'
import {createFromIconfontCN} from '@ant-design/icons'
import {FC} from "react";

declare var require: any

export interface IconProps {
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  title?: string;
  className?: string;
  type: string;
}

const Iconfont = createFromIconfontCN({
  scriptUrl: require('./iconfont.js'),
})
const Icon: FC<IconProps> = ({type, ...otherProps}) => {
  return <Iconfont type={type} {...otherProps} />
}
export default Icon
