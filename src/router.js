import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Home/index'),
      meta: {
        title: '',
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register/index'),
      meta: {
        title: '',
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Home/index'),
      meta: {
        title: '',
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/order',
      name: 'order',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Order/index'),
      meta: {
        title: '订单',
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/orderOnline',
      name: 'orderOnline',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Order/indexOnline'),
      meta: {
        title: '订单',
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/User/index'),
      meta: {
        title: '我的',
        keepAlive: false, // 不需要被缓存
        tab: true
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/User/coupon/index'),
      meta: {
        title: '我的优惠券',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/purse',
      name: 'purse',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/User/myPurse/index'),
      meta: {
        title: '我的红包',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/myBean',
      name: 'myBean',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/User/myBean/index'),
      meta: {
        title: '我的趣豆',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/purseRecord',
      name: 'purseRecord',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/User/purseRecord/index'),
      meta: {
        title: '红包记录',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/mineralElement',
      name: 'mineralElement',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/mineralElement/index'),
      meta: {
        title: '矿物元素',
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/PaySuccess/index'),
      meta: {
        title: '支付成功',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/led',
      name: 'led',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/led/index'),
      meta: {
        title: 'LED广告发布',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/cropper',
      name: 'cropper',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/demo/cropper'),
      meta: {
        title: '测试',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/address',
      name: 'address',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/address/index'),
      meta: {
        title: '我的地址',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/addAddress/index'),
      meta: {
        title: '新增地址',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/confirm',
      name: 'confirm',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/confirm/index'),
      meta: {
        title: '提交订单',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/paySuccessOnline',
      name: 'paySuccessOnline',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/PaySuccessOnline/index'),
      meta: {
        title: '支付成功',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/payFailOnline',
      name: 'payFailOnline',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/PayFailOnline/index'),
      meta: {
        title: '未支付',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/suc',
      name: 'suc',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/led/success/index'),
      meta: {
        title: '发布成功',
        keepAlive: false // 不需要被缓存
      }
    }
  ]
})
