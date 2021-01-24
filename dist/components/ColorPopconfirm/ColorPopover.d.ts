/** @format */
import { FC } from 'react';
import './style.less';
export interface ColorPopoverProps {
    color?: string;
    initialColor?: string;
    onChange: (color: string) => void;
}
declare const ColorPopover: FC<ColorPopoverProps>;
export default ColorPopover;
