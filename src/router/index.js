import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

function changEnter(path, next) {
  // 取出你有权限可以去的地址
  let menu_url = store.state.userinfo.menus_url;
  if (menu_url.includes(path)) {
    next();
  } else {
    next("/")
  }
}

export const childrenPath = [
  {
    path: 'menu',
    name: '菜单管理',
    component: () => import('../page/menu/menu.vue'),
    beforeEnter: (to, from, next) => {
      changEnter("/menu", next)
    }
    // beforeEnter: (to, from, next) => {
    //   // changEnter("menu",next)
    //   let aa = store.state.userinfo.menus_url;
    //   if(aa.includes("/menu")){
    //     next()
    //   }else{
    //     next("/")
    //   }
    // }
  },
  {
    path: 'role',
    name: '角色管理',
    component: () => import('../page/role/role.vue'),
    beforeEnter: (to, from, next) => {
      changEnter("/role", next)
    }
  },
  {
    path: 'manage',
    name: '管理员管理',
    component: () => import('../page/manage/manage.vue'),
    beforeEnter: (to, from, next) => {
      changEnter("/manage", next)
    }
  },
  {
    path: 'cate',
    name: '商品分类',
    component: () => import('../page/cate/cate.vue'),
    beforeEnter: (to, from, next) => {
      changEnter("/cate", next)
    }
  },
  {
    path: 'spec',
    name: '商品规格',
    component: () => import('../page/specss/specss.vue'),
    beforeEnter: (to, from, next) => {
      changEnter("/spec", next)
    }
  },
  {
    path: 'goods',
    name: '商品管理',
    component: () => import('../page/goods/goods.vue'),
    beforeEnter: (to, from, next) => {
      changEnter("/goods", next)
    }
  },
  {
    path: 'member',
    name: '会员管理',
    component: () => import('../page/member/member'),
    beforeEnter: (to, from, next) => {
      changEnter("/member", next)
    }
  },
  {
    path: 'seckill',
    name: '秒杀活动',
    component: () => import('../page/flash/flash.vue'),
    beforeEnter: (to, from, next) => {
      changEnter("/seckill", next)
    }
  },
  {
    path: 'banner',
    name: '轮播图',
    component: () => import("../page/banner/banner.vue"),
    beforeEnter: (to, from, next) => {
      changEnter("/banner", next)
    }
  },

  {
    path: '*',
    redirect: "home"
  }
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import("../page/login/login.vue")
    },
    {
      path: '/',
      component: () => import("../page/index/index.vue"),
      children: [{
        path: "",
        component: () => import("../page/home/home")
      },
      ...childrenPath
      ]
    }
  ]
})

//  1 登录拦截
router.beforeEach((to, from, next) => {
  // 1 如过去登录页直接进去
  if (to.path == "/login") {
    next();
    return
  }
  //  2 如果去的是其他页面 验证仓库的token是否存在 如果存在说明登录过来
  if (store.state.userinfo.token) {
    next();
    return
  }
  next("/login")
})


export default router