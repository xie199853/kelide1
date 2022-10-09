
import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  children: [{
    name: 'social',
    path: '',
    name: 'social',
    component: () => import('@/views/social'),

    meta: {
      title: '对账统计', icon: 'el-icon-data-line'
    }
  }]
}

