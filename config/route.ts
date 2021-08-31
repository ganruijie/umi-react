export interface IChildRoute {
  path: string,
  name: string,
  component: string
};
export interface IBastAFRoute {
  routes?: IChildRoute[],
  path: string,
  component?: string,
  name?: string,
  icon?: string,
  target?: boolean,
  headerRender?: boolean,
  footerRender?: boolean,
  menuRender?: boolean,
  menuHeaderRender?: boolean,
  access?: string,
  hideChildrenInMenu?: boolean,
  hideInMenu?: boolean,
  flatMenu?: boolean
};
const routes:Array<IBastAFRoute> = [
  {
    path: '/',
    component: '@/pages/index'
  },
  {
    path: '/home',
    name: '首页',
    icon: 'HomeOutlined',
    component: '@/pages/home/index',
  },
  {
    path: '/login',
    name: '登录',
    component: '@/pages/login/index',
    headerRender: false,
    footerRender: false,
    menuRender: false
  },
  {
    path: '/banner',
    name: '轮播图管理',
    icon: 'FileImageOutlined',
    routes: [
      {
        path: '/banner/list',
        name: '轮播图列表',
        component: '@/pages/banner/list'
      }
    ],
  },
  {
    path: '/pro',
    name: '产品管理',
    icon: 'UnorderedListOutlined',
    routes: [
      {
        path: '/pro/recommend',
        name: '推荐列表',
        component: '@/pages/proManage/recommend'
      },
      {
        path: '/pro/seckill',
        name: '秒杀列表',
        component: '@/pages/proManage/seckill'
      }
    ]
  }
];
export default routes;
