
import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  children: [{
    name: 'salarys',
    path: '',
    component: () => import('@/views/salarys'),

    meta: {
      title: '策略管理', icon: 'dengpao'
    }
  }]
}

