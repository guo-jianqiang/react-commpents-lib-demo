/** @format */
import { RouteItem } from '../components/Layout/Layout';
/**
 * @description 判空
 * @param obj
 */
export declare const isEmpty: (obj: any) => boolean;
export declare function treeForeach(tree: Array<RouteItem>, func: (node: RouteItem) => void): void;
/**
 * @author gjq
 * @description 获取当前节点路径
 * @param nodes
 * @param handler
 * @param key
 */
export declare function getTreePath(nodes: Array<RouteItem>, handler: (node: RouteItem) => {}, key?: string): any;
/**
 * 获取第一个非空路由
 * @param routes
 * @returns {*}
 */
export declare const getFirstRoute: (routes: Array<RouteItem>) => RouteItem | any;
/**
 * 建立一个可存取到该file的url
 * @param file
 */
export declare const getObjectURL: (file: File) => string | null;
export declare function getPosition(el: any): {
    x: number;
    y: number;
};
