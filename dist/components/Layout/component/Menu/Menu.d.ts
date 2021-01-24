/** @format */
import { FC } from 'react';
import { RouteItem } from '../../Layout';
import { History } from 'history';
export interface MenuProps {
    collapsed: boolean;
    routeItems: Array<RouteItem>;
    history: History;
}
declare const Menu: FC<MenuProps>;
export default Menu;
