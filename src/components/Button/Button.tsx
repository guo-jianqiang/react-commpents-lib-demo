import React, {FC} from "react";
import style from './style.less'

export interface ButtonProps {
    text?: string;
    className?: string;
}

export const Button: FC<ButtonProps> = ({children, ...otherProps}) => {
    return (<button className={style.test} {...otherProps}>{children}</button>)
}