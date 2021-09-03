import { defineConfig } from 'umi';
import routes from './config/route';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  routes,
  fastRefresh: {},
  layout: {
    name: 'test-react',
    logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fi%2Fimage%2FM00%2F1C%2F95%2FCgpEMlkBrbuANDoAAABOTfWdJhc845.png&refer=http%3A%2F%2Fwww.lgstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg',
  },
  dva: {
    immer: true,
    hmr: false,
  },
});
