import React, {FC} from "react";
import style from './style.less'

export interface ButtonProps {
    text?: string;
    className?: string;
}

export const Button: FC<ButtonProps> = ({children, ...otherProps}) => {
    return <React.Fragment>
        <svg width={600} height={600}>
            <defs>
                <linearGradient
                    id="grad1"
                    // x1="0.4" y1="0.6" x2=".7" y2="0.8"
                >
                    <stop offset="0%" stop-color="#FFCE00"/>
                    <stop offset="100%" stop-color="#FFCE00" stop-opacity="0" />
                </linearGradient>
            </defs>
            {/*<path d="M50 10  A40 40 0 1 0 90 50"*/}
            {/*      stroke="url(#grad1)" stroke-width="10" fill="transparent"/>*/}
            <path className="lineGroups" stroke="url(#grad1)" stroke-width="3" fill="none"
                  d="M228.30702304936858,338.1163296015934 Q291.1582184631694,340.79700644081254 326.7243957519531,392.6863708496094"
            ></path>
        </svg>
        <button className={style.test} {...otherProps}>{children}</button>
    </React.Fragment>
}