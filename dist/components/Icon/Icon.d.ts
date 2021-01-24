/** @format */
import * as React from 'react';
import { FC } from "react";
export interface IconProps {
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    title?: string;
    className?: string;
    type: string;
}
declare const Icon: FC<IconProps>;
export default Icon;
