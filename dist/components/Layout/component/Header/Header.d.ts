/** @format */
import React, { FC } from 'react';
import { History } from 'history';
import './style.less';
export interface HeaderProps {
    username: string;
    breadcrumb: React.ReactNode;
    collapseBtn: React.ReactNode;
    history: History;
    onClickDrop: () => void;
}
declare const Header: FC<HeaderProps>;
export default Header;
