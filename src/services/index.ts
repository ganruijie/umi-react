import request from '@/api/index';
import { getItem } from '@/utils/cookie';

// 不要使用常量或者变量，只会执行一次
// const adminname = getItem('adminname') || 'safjkhsdgjhsdjhsdgfjdshgfjhdsgfds'
export const checkAuthReq = () => {
  // 通过获取管理员的信息接口去判断有无登录
  // 真实情况应该是 调用 获取管理员登录状态的 接口去判断
  // 如果输出的数据的长度大于0 认为是登录的
  return request({
    url: '/admin/detail',
    method: 'GET',
    data: {
      adminname: getItem('adminname') || 'safjkhsdgjhsdjhsdgfjdshgfjhdsgfds',
    },
  });
};
