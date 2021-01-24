import React from 'react';
import {createHashHistory} from 'history'
import Layout from './index';

/**
 * Layout 预览
 */
export const LayoutDemo = () => {
  const routeItems = [
    {
      path: '/home',
      exact: true,
      meta: {
        tabFixed: true,
        isCache: true,
        icon: 'iconuser',
        name: '首页',
      },
      component: () => <div>home</div>,
    },
    {
      path: '/test',
      exact: true,
      meta: {
        isCache: true,
        icon: 'iconuser',
        name: '测试页',
      },
      component: () => <div>test</div>,
    },
  ]
  return (
    <div className='storybook__container'>
      <Layout
        proName='admin-demo'
        // aliveControl={aliveControl}
        routeItems={routeItems}
        history={createHashHistory()}
        username={'测试'}
        onClickDrop={() => {console.log('退出')}}
      >
        <div>layout</div>
      </Layout>
    </div>
  )
}

export default {
  title: 'layout',
  component: Layout
};