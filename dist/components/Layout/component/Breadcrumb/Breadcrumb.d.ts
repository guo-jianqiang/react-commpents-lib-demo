/** @format */
import { FC } from 'react';
import { History } from 'history';
import { RouteItem } from '../../Layout';
export interface BreadcrumbProps {
    routes: Array<RouteItem>;
    history: History;
}
declare const Breadcrumb: FC<BreadcrumbProps>;
export default Breadcrumb;
