import Layout from '@/layout'
export default {
  path: '/user',
  component: Layout,
  meta: { title: '人员管理', icon: 'dashboard' },
  children: [
    {
      path: '/user/index',
      name: 'userindex',
      component: () => import('@/views/user'),
      meta: { title: '人员列表', icon: 'dashboard' }
    },
    {
      path: '/user/user-task-stats',
      name: 'user-task-stats',
      component: () => import('@/views/user/user-task-stats'),
      meta: { title: '人效统计', icon: 'dashboard' }
    },
    {
      path: '/user/user-work',
      name: 'user-work',
      component: () => import('@/views/user/user-work'),
      meta: { title: '工作量列表', icon: 'dashboard' }
    }

  ]
}

