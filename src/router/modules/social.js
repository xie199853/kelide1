
import Layout from '@/layout'
export default {
  path: '/report',
  component: Layout,
  children: [{
    name: 'report',
    path: '',
    component: () => import('@/views/report'),

    meta: {
      title: '对账统计', icon: 'el-icon-data-line'
    }
  }]
}

