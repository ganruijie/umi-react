export interface IChildRoute {
  path: string;
  name: string;
  component: string;
  wrappers?: string[];
}
export interface IBastAFRoute {
  routes?: IChildRoute[];
  path: string;
  redirect?: string;
  exact?: boolean;
  component?: string;
  name?: string;
  icon?: string;
  target?: boolean;
  headerRender?: boolean;
  footerRender?: boolean;
  menuRender?: boolean;
  menuHeaderRender?: boolean;
  access?: string;
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  hideInBreadcrumb?: boolean;
  flatMenu?: boolean;
  wrappers?: string[];
}
const routes: Array<IBastAFRoute> = [
  {
    path: '/',
    component: '@/pages/index',
    exact: true,
    redirect: '/home',
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
    menuRender: false,
  },
  {
    path: '/banner',
    name: '轮播图管理',
    icon: 'FileImageOutlined',
    routes: [
      {
        path: '/banner/list',
        name: '轮播图列表',
        component: '@/pages/banner/list',
        wrappers: ['@/wrappers/auth'],
      },
    ],
  },
  {
    path: '/product',
    name: '产品管理',
    icon: 'UnorderedListOutlined',
    routes: [
      {
        path: '/product/list',
        component: '@/pages/product/list',
        name: '产品列表',
      },
      {
        path: '/product/recommend',
        name: '推荐列表',
        component: '@/pages/product/recommend',
      },
      {
        path: '/product/seckill',
        name: '秒杀列表',
        component: '@/pages/product/seckill',
      },
    ],
  },
];
export default routes;
