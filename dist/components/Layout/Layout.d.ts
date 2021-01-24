/** @format */
import React from 'react';
import Header from './component/Header/Header';
import Breadcrumb from './component/Breadcrumb/Breadcrumb';
import Menu from './component/Menu/Menu';
import Tabs from './component/Tabs/Tabs';
import { History } from "history";
import './style.less';
export interface LayoutStyle extends React.CSSProperties {
    '--layout-menu-width': string;
}
declare type ComponentType = React.ComponentType<any> & {
    name: string;
};
export interface RouteItem {
    path: string;
    exact: boolean;
    meta: {
        tabFixed?: boolean;
        isCache?: boolean;
        hidden?: boolean;
        name: string;
        icon: Function | string;
    };
    component: ComponentType;
    routes?: Array<RouteItem>;
}
export interface aliveControlInterface {
    dropByCacheKey: (cacheKey: string) => void;
    refreshByCacheKey: (cacheKey: string) => void;
    getCachingKeys: () => Array<string>;
    clearCache: () => void;
}
export interface LayoutProps {
    style?: React.CSSProperties;
    className?: string;
    /**
     *  图标
     */
    logo?: any;
    /**
     *  项目名
     */
    proName?: string;
    /**
     * aliveControl 路由缓存函数，若要使用请安装[react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)
     * 替换react-router-dom中Switch=>CacheSwitch,Route=>CacheRoute,并将dropByCacheKey、refreshByCacheKey方法放入该对象导入。导入改对象后默认开启路由缓存功能。
     */
    aliveControl?: aliveControlInterface;
    /**
     *  路由表
     */
    routeItems: Array<RouteItem>;
    /**
     * history 对象
     */
    history: History;
    /**
     *  用户名
     */
    username: string;
    /**
     *  退出函数
     */
    onClickDrop: () => void;
}
export declare type LayoutInnerComponent = {
    Tabs: typeof Tabs;
    Header: typeof Header;
    Menu: typeof Menu;
    Breadcrumb: typeof Breadcrumb;
};
declare const Layout: React.FC<LayoutProps> & LayoutInnerComponent;
export default Layout;
