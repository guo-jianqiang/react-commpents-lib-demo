import React, {FC} from "react";
import style from './style.less'

export interface ButtonProps {
    text?: string;
    className?: string;
}

export const Button: FC<ButtonProps> = ({children, ...otherProps}) => {
    return <React.Fragment>
        <svg>
            <defs>
                <radialGradient
                    id="grad"
                    cx="0.5"
                    cy="0.5"
                    r="0.5" >
                    <stop offset="0%" stop-color="#fff" stop-opacity='1' />
                    <stop offset="100%" stop-color="#fff" stop-opacity='0'/>
                </radialGradient>
                <mask id="Mask">
                    <circle r="100" fill="url(#grad)"  />
                </mask>
            </defs>
            <rect width='100' height='100' fill='#000' mask='url(#Mask)' />
        </svg>
        <button className={style.test} {...otherProps}>{children}</button>
    </React.Fragment>
}