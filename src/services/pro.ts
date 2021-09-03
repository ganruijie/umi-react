import request from '@/api/index';
export interface IProListParams {
  count: number;
  limitNum: number;
}
export function getProListReq(params: IProListParams) {
  return request({
    url: '/pro/list',
    data: params,
  });
}
export function getRecommendListReq() {
  return request({
    url: '/pro/showdata',
    data: {
      type: 'isrecommend',
      flag: 1,
    },
  });
}
export function getSeckillListReq() {
  return request({
    url: '/pro/showdata',
    data: {
      type: 'isseckill',
      flag: 1,
    },
  });
}

export function getCategoryReq() {
  return request({
    url: '/pro/getCategory',
  });
}

export function getSearchListReq(params: { category: string; search: string }) {
  return request({
    url: '/pro/searchPro',
    data: params,
    method: 'POST',
  });
}
