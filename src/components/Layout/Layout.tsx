/** @format */
import React, {useRef, useReducer} from 'react'
import cx from 'classnames'
import Header from './component/Header/Header'
import Breadcrumb from './component/Breadcrumb/Breadcrumb'
import Menu from './component/Menu/Menu'
import Icon from '../Icon'
import {Tooltip, BackTop} from 'antd'
import defaultLogo from '../../assets/images/logo.svg'
import Tabs from './component/Tabs/Tabs'
import {configurationReducer} from './store/configurationReducer'
import ConfigurationContext, {getSystemConfig} from './store/configurationContext'
import {actionCollapsed} from './store/configurationAction'
import {History} from "history";
import './style.less'


export interface LayoutStyle extends React.CSSProperties {
  '--layout-menu-width': string;
}

type ComponentType = React.ComponentType<any> & {name: string}

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
export type LayoutInnerComponent = {
  Tabs: typeof Tabs;
  Header: typeof Header;
  Menu: typeof Menu;
  Breadcrumb: typeof Breadcrumb;
}

const Layout: React.FC<LayoutProps> & LayoutInnerComponent = ({className, style,routeItems, history, username = '', aliveControl, onClickDrop, logo, proName, children}) => {
  const [configState, dispatch] = useReducer(configurationReducer, getSystemConfig())
  const contentRef = useRef<HTMLDivElement | null>(null)
  const handleClickCollapse = () => {
    dispatch(actionCollapsed({...configState, collapsed: !configState.collapsed}))
  }
  const handleClickMask = () => {
    dispatch(actionCollapsed({...configState, collapsed: true}))
  }
  const handleClickDrop = () => {
    onClickDrop && onClickDrop()
  }
  const {collapsed} = configState
  const collapseBtn = (
    <Tooltip title={collapsed ? '展开' : '收起'}>
      <Icon
        type={collapsed ? 'iconzhankai' : 'iconshouqi'}
        className={'layout-right-headerBtn'}
        onClick={handleClickCollapse}
      />
    </Tooltip>
  )
  const layoutStyle: LayoutStyle = {'--layout-menu-width': collapsed ? '56px' : '220px'}
  return (
    <ConfigurationContext.Provider
      value={{
        state: configState,
        dispatch,
      }}>
      <div className={cx('layout', className)} style={{...style, ...layoutStyle}}>
        <div
          className={cx('layout-mask', {
            'layout-mask-collapsed': collapsed,
          })}
          onClick={handleClickMask}
        />
        <aside
          className={cx('layout-aside', {
            'layout-aside-collapsed': collapsed,
          })}>
          <div
            className={cx('layout-aside-logo', {
              'layout-aside-logo-collapsed': collapsed,
            })}>
            <a>
              <img src={logo || defaultLogo} />
              {!collapsed && <h1 className={'text-ellipsis-1'}>{proName || ''}</h1>}
            </a>
          </div>
          <div className={'layout-aside-menu'}>
            <Menu collapsed={collapsed} routeItems={routeItems} history={history} />
          </div>
        </aside>
        <div className={'layout-right'}>
          <Header
            history={history}
            username={username}
            collapseBtn={collapseBtn}
            onClickDrop={handleClickDrop}
            breadcrumb={<Breadcrumb routes={routeItems} history={history} />}
          />
          <Tabs history={history} routeItems={routeItems} aliveControl={aliveControl} />
          <div className={'layout-right-content'} ref={contentRef}>
            {children}
            <BackTop
              style={{right: 32, bottom: 32}}
              target={() => contentRef.current || window}
              visibilityHeight={200}
            />
          </div>
        </div>
      </div>
    </ConfigurationContext.Provider>
  )
}

Layout.Tabs = Tabs
Layout.Header = Header
Layout.Menu = Menu
Layout.Breadcrumb = Breadcrumb

export default Layout
