import Layout from '@/layout'
export default {
  path: '/worker',
  component: Layout,
  meta: {
    title: '工单管理',
    icon: 'zhangdan1'
  },
  children: [{
    name: 'worker',
    path: '',
    component: () => import('@/views/worker/Operation'),
    meta: {
      title: '运营管理'
    //   icon: 'tree-table'
    }
  }, {
    name: 'devops',
    path: 'devops',
    component: () => import('@/views/worker/devOps'),
    meta: {
      title: '运维管理'
    //   icon: 'tree-table'
    }
  }]
}

