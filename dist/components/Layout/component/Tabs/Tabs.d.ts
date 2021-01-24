/** @format */
import { FC } from 'react';
import { History } from 'history';
import { RouteItem, aliveControlInterface } from '../../Layout';
import './style.less';
export interface TabsProps<T> {
    scrollDistance?: number;
    aliveControl?: aliveControlInterface;
    history: History;
    routeItems: Array<T>;
}
declare type TabsStaticFun = {
    clearTabsCache: () => void;
};
export declare type TabsType = FC<TabsProps<RouteItem>> & TabsStaticFun;
declare const Tabs: TabsType;
export default Tabs;
