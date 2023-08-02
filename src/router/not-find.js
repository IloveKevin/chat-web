import routerName from '@/common/router-name'
export default {
    path: '*',
    name: routerName.NOT_FIND,
    component: () => import('@/views/404.vue'),
    meta: {
        title: '404',
        needLogin: false
    }
}